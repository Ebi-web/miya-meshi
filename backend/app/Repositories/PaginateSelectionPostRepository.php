<?php

namespace App\Repositories;

use App\Models\SelectionPost;
use App\Models\SelectionPostArea;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use InvalidArgumentException;

class PaginateSelectionPostRepository
{
    /**
     * Selection Postのページネーション取得
     *
     * @param (true|false)[] $releases
     * @param integer $limit
     * @param integer|null $id
     * @param string|null $created_at
     * @param string|null $updated_at
     * @return array
     */
    public function invoke(
        array $releases = [true],
        int $limit = 3,
        ?int $id = null,
        ?string $created_at = null,
        ?string $updated_at = null
    ): array {
        // Cursor
        $cursor = [];
        isset($id) && $cursor['id'] = $id;
        isset($updated_at) && $cursor['updated_at'] = $updated_at;
        isset($created_at) && $cursor['created_at'] = $created_at;

        // Release
        $releasesCount = count($releases);
        if ($releasesCount === 1) {
            $selectionPostQuery = SelectionPost::whereRelease($releases[0]);
        } else if ($releasesCount === 2) {
            $selectionPostQuery = new SelectionPost();
        } else if ($releasesCount > 2) {
            throw new InvalidArgumentException('$releasesの配列の個数は最大2個までです。');
        }

        // Create Pagination
        $selectionPost = $selectionPostQuery
            ->lampager()
            ->forward()
            ->limit($limit)
            ->orderByDesc('updated_at') // ORDER BY `updated_at` DESC, `created_at` DESC, `id` DESC
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->seekable()
            ->paginate($cursor)
            ->toArray(JSON_PRETTY_PRINT);

        $selectionPostRecords = new Collection($selectionPost['records']);

        /** @var string[] $selectionPostIds */
        $selectionPostIds = $selectionPostRecords
            ->map(fn($_selectionPost) => Arr::get($_selectionPost, 'id', null))
            ->all();

        $firebaseAreaIds = $this->getFirebaseAreaIds($selectionPostIds);
        $mappedRecords = $selectionPostRecords->map(function($_selectionPost) use ($firebaseAreaIds) {
            Arr::set($_selectionPost, 'firebase_areas_ids', Arr::get($firebaseAreaIds, Arr::get($_selectionPost, 'id', null), null));
            return $_selectionPost;
        })->toArray();

        Arr::set($selectionPost, 'records', $mappedRecords);

        return $selectionPost;
    }

    /**
     * FirebaseAreaIdsを取得する
     *
     * @param string[] $selectionPostIds
     * @return array
     * @example [
     *   'selectionPostId' => ['firebaseAreaId', 'firebaseAreaId', 'firebaseAreaId'],
     *   'selectionPostId' => ['firebaseAreaId', 'firebaseAreaId', 'firebaseAreaId']
     * ]
     */
    protected function getFirebaseAreaIds(array $selectionPostIds): array
    {
        $selectionPostAreas = SelectionPostArea::whereIn('selection_post_id', $selectionPostIds)
                                ->get(['selection_post_id', 'firebase_area_id'])
                                ->groupBy('selection_post_id')
                                ->map(fn ($_selectionPostAreas) =>
                                    (new Collection($_selectionPostAreas))->map(
                                        fn ($_selectionPostArea) => $_selectionPostArea['firebase_area_id']
                                    )->toArray()
                                )->all();
        return $selectionPostAreas;
    }
}

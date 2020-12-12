<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Shop extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'release',
        'publish_from',
        'publish_to',
        'priority',
        'display_mode'
    ];

    protected $dates = ['deleted_at', 'publish_from', 'publish_to'];

    protected $casts = [
        'priority' => 'integer',
        'release'  => 'boolean'
    ];

    /**
     * 現在公開中かどうか
     *
     * @param boolean $release
     * @param Carbon|null $publish_from
     * @param Carbon|null $publish_to
     * @param Carbon $now
     * @return boolean
     */
    public static function getNowPublic(
        bool $release,
        ?Carbon $publish_from,
        ?Carbon $publish_to,
        Carbon $now
    ): bool {
        if (!$release) {
            return false;
        }

        if ($publish_from === null && $publish_to === null) {
            return true;
        }

        if ($publish_from && $publish_from->lt($now) && $publish_to === null) {
            return true;
        }

        if ($publish_to && $publish_to->gt($now) && $publish_from === null) {
            return true;
        }

        if ($publish_to && $publish_to->gt($now) && $publish_to && $publish_from->lt($now)) {
            return true;
        }

        return false;
    }

    /**
     * 現在公開中かどうか
     *
     * @return boolean
     */
    public function getNowPublicAttibute(): bool
    {
        $now = Carbon::now();
        return self::getNowPublic(
            $this->release,
            $this->publish_from,
            $this->publish_to,
            $now
        );
    }

    /**
     * 現在公開中のものを取得する
     *
     * @param $query
     * @param Carbon $now
     * @return void
     */
    public function scopeNowPublicPosts($query, Carbon $now)
    {
        return $query->whereRelease(true)
            ->where(function ($query) use ($now) {
                $query->where(function ($query) use ($now) {
                    $query->where('publish_from', '<', $now)->where('publish_to', '>', $now);
                })
                ->orWhere(function($query) use($now) {
                    $query->where('publish_from', '<', $now)->whereNull('publish_to');
                })
                ->orWhere(function($query) use($now) {
                    $query->where('publish_to', '>', $now)->whereNull('publish_from');
                })
                ->orWhere(function($query) {
                    $query->whereNull('publish_from')->whereNull('publish_to');
                });
            });
    }

    public function shopInformation(): HasOne
    {
        return $this->hasOne(ShopInformation::class);
    }

    public function shopMenus(): HasMany
    {
        return $this->hasMany(ShopMenu::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function firebaseShop(): HasOne
    {
        return $this->hasOne(FirebaseShop::class);
    }
}

import firebase from 'firebase'
import { Shop, SHOP_TYPE } from '@/src/types/Shop'

const SHOP_COLLECTION_NAME = 'shops'

/**
 * Shop一覧を取得
 *
 * @param { firebase.firestore.Firestore } $fireStore
 * @param { Number } limit 取得最大数
 * @param { Boolean } admin 管理者かどうか
 */
export const getShopList = async (
  $fireStore: firebase.firestore.Firestore,
  limit: number = 12,
  admin: boolean = false
) => {
  const publicWhere: boolean[] = admin ? [true, false] : [true]

  const list = await $fireStore
    .collection(SHOP_COLLECTION_NAME)
    .where('public', 'in', publicWhere)
    .limit(limit)
    .get()

  const shops = [] as Shop[]
  list.forEach((doc) => {
    shops.push(firestoreDocDataToShop(doc))
  })
  return shops
}

/**
 * Shopの取得
 *
 * @param { firebase.firestore.Firestore } $fireStore
 * @param { string } id
 */
export const getShopByID = async (
  $fireStore: firebase.firestore.Firestore,
  id: string
) => {
  const doc = await $fireStore
    .collection(SHOP_COLLECTION_NAME)
    .doc(id)
    .get()
  return firestoreDocDataToShop(doc)
}

/**
 * FirebaseのデータをShop型に変換
 *
 * @param { firebase.firestore.QueryDocumentSnapshot|firebase.firestore.DocumentSnapshot } doc
 */
export const firestoreDocDataToShop = (
  doc: firebase.firestore.QueryDocumentSnapshot|firebase.firestore.DocumentSnapshot
) => {
  const docData = doc.data()

  return {
    type: SHOP_TYPE,
    id: doc.id,
    ...docData
  } as Shop
}

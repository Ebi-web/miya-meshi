import firebase from 'firebase'
import { Keyword } from '@/lib/types/Keyword'
import { Collection, Type } from '@/lib/enum'

const KEYWORDS_COLLECTION_NAME = Collection.KEYWORDS

/**
 * キーワード一覧を取得
 *
 * @param { firebase.firestore.Firestore }  $fireStore
 */
export const getKeywordList = async (
  $fireStore: firebase.firestore.Firestore
) => {
  const list = await $fireStore.collection(KEYWORDS_COLLECTION_NAME).orderBy('priority', 'desc').get()

  const keywords = [] as Keyword[]
  list.forEach((doc) => {
    keywords.push(firestoreDocDataToKeyword(doc))
  })
  return keywords
}

/**
 * Keywordの取得
 *
 * @param { firebase.firestore.Firestore } $fireStore
 * @param { string } id
 */
export const getKeywordByID = async (
  $fireStore: firebase.firestore.Firestore,
  id: string
) => {
  const doc = await $fireStore.collection(KEYWORDS_COLLECTION_NAME).doc(id).get()
  return firestoreDocDataToKeyword(doc)
}

/**
 * FirebaseのデータをKeyword型に変換
 *
 * @param { firebase.firestore.QueryDocumentSnapshot|firebase.firestore.DocumentSnapshot } doc
 */
export const firestoreDocDataToKeyword = (
  doc: firebase.firestore.QueryDocumentSnapshot|firebase.firestore.DocumentSnapshot
) => {
  const docData = doc.data()

  return {
    type: Type.KEYWORD,
    id: doc.id,
    ...docData
  } as Keyword
}

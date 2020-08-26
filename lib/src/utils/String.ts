import { hankakuKatakanaToZenkakuKatakana as hankakuKatakanaToZenkakuKatakanaLib } from '../lib/hankakuKatakanaToZenkakuKatakana'

/**
 * 文字列型かどうか
 *
 * @param { any } v
 */
export const isString = (v: any): v is string => typeof v === 'string'

/**
 * 全角英数字を半角英数字に変換
 *
 * @param { string } str
 */
export const zenkakuToHankaku = (str: string) => {
  return str.replace(
    /[Ａ-Ｚａ-ｚ０-９]/g,
    (s: string) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
  )
}

/**
 * 半角カタカナを全角カタカナに変換する
 *
 * @param { string } str
 */
export const hankakuKatakanaToZenkakuKatakana = (str: string) =>
  hankakuKatakanaToZenkakuKatakanaLib(str)

/**
 * 正しい郵便番号であるか
 *
 * @param {string|number|undefined} v
 */
export const isPostal = (v?: string|number) => {
  const postalRegex = /^\d{3}[-]\d{4}$|^\d{3}[-]\d{2}$|^\d{3}$|^\d{5}$|^\d{7}$/
  if (!v) {
    return false
  }

  const testVal: string = isString(v) ? v : String(v)
  return postalRegex.test(testVal)
}

/**
 * 漢数字を半角数字に変換する
 *
 * @param { string } str
 */
export const kanji2num = (str: string) => {
  const kanjiNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '〇']
  const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  for (let i = 0; i < num.length; i++) {
    const reg = new RegExp(kanjiNum[i], 'g')
    str = str.replace(reg, num[i])
  }

  return str
}

/**
 * 文字列を0で埋める
 *
 * @param { string|number } v
 * @param { number } max
 */
export const zeroFill = (v: string|number, max: number = 3) => {
  const str = isString(v) ? v : String(v)
  return (`${'0'.repeat(max)}${str}`).slice(-max)
}

import {
  hankakuKatakanaToZenkakuKatakana,
  isPostal,
  isString,
  kanji2num,
  zenkakuToHankaku,
  zeroFill
} from '@/src/utils/String'

describe('utils/String', () => {
  describe('isString', () => {
    type testType = {
      message: string,
      arg: any,
      expected: boolean
    }

    const testCases = [
      { message: 'String型である (String)', arg: '21', expected: true },
      { message: 'String型である (空文字)', arg: '', expected: true },
      { message: 'String型でない (Object)', arg: {}, expected: false },
      { message: 'String型でない (Number)', arg: 0, expected: false },
      { message: 'String型でない (Number)', arg: 10, expected: false },
      { message: 'String型でない (Boolean)', arg: true, expected: false },
      { message: 'String型でない (Number[])', arg: [] as Number[], expected: false },
      { message: 'String型でない (string[])', arg: [] as string[], expected: false },
      { message: 'String型でない (Array)', arg: [], expected: false }
    ] as testType[]

    testCases.forEach((testCase) => {
      it(testCase.message, () => {
        expect(isString(testCase.arg)).toBe(testCase.expected)
      })
    })
  })

  describe('isPostal', () => {
    type testType = {
      message: string,
      arg?: string|number,
      expected: boolean
    }

    const testCases = [
      { message: '郵便番号である', arg: '321-0922', expected: true },
      { message: '郵便番号である', arg: '3210922', expected: true },
      { message: '郵便番号である', arg: 3210922, expected: true },
      { message: '郵便番号でない', arg: 'abc-defg', expected: false },
      { message: '郵便番号でない', arg: undefined, expected: false }
    ] as testType[]

    testCases.forEach((testCase) => {
      it(`${testCase.message} (${testCase.arg}`, () => {
        expect(isPostal(testCase.arg)).toBe(testCase.expected)
      })
    })
  })

  describe('zenkakuToHankaku', () => {
    type testType = {
      message: string,
      arg: string,
      expected: string
    }

    const testCases = [
      { message: '全角英語を半角英語に変換できる', arg: 'ｗｓｘ', expected: 'wsx' },
      { message: '全角数字を半角数字に変換できる', arg: '１２３', expected: '123' },
      { message: '全角英数字を半角英数字に変換できる', arg: 'ｗｓｘ１２３', expected: 'wsx123' },
      { message: '半角英語は半角英数字のままである', arg: 'wsx', expected: 'wsx' },
      { message: '半角数字は半角英数字のままである', arg: '123', expected: '123' },
      { message: '半角英数字は半角英数字のままである', arg: 'wsx123', expected: 'wsx123' }
    ] as testType[]

    testCases.forEach((testCase) => {
      it(`${testCase.message} (${testCase.arg} → ${testCase.expected})`, () => {
        expect(zenkakuToHankaku(testCase.arg)).toBe(testCase.expected)
      })
    })
  })

  describe('hankakuKatakanaToZenkakuKatakana', () => {
    type testType = {
      message: string,
      arg: string,
      expected: string
    }

    const testCases = [
      { message: '半角カタカナを全角カタカナに変換できる', arg: 'ｱｲｳ', expected: 'アイウ' },
      { message: '全角カタカナは全角カタカナのままである', arg: 'アイウ', expected: 'アイウ' }
    ] as testType[]

    testCases.forEach((testCase) => {
      it(`${testCase.message} (${testCase.arg} → ${testCase.expected})`, () => {
        expect(hankakuKatakanaToZenkakuKatakana(testCase.arg)).toBe(testCase.expected)
      })
    })
  })

  describe('kanji2num', () => {
    type testType = {
      message: string,
      arg: string,
      expected: string
    }

    const testCases = [
      { message: '漢数字を算用数字に変換できる', arg: '一', expected: '1' },
      { message: '漢数字を算用数字に変換できる', arg: '一二', expected: '12' },
      { message: '漢数字を算用数字に変換できる', arg: 'あ三い', expected: 'あ3い' }
    ] as testType[]

    testCases.forEach((testCase) => {
      it(`${testCase.message} (${testCase.arg} → ${testCase.expected})`, () => {
        expect(kanji2num(testCase.arg)).toBe(testCase.expected)
      })
    })
  })

  describe('zeroFill', () => {
    type testType = {
      message: string,
      arg: {
        v: string|number,
        max: number
      },
      expected: string
    }

    const testCases = [
      { message: '最大桁数3桁のとき、0で埋められる', arg: { v: 1, max: 3 }, expected: '001' },
      { message: '最大桁数3桁のとき、0で埋められる', arg: { v: '1', max: 3 }, expected: '001' },
      { message: '最大桁数3桁のとき、0で埋められる', arg: { v: 10, max: 3 }, expected: '010' },
      { message: '最大桁数3桁のとき、0で埋められる', arg: { v: '10', max: 3 }, expected: '010' },
      { message: '最大桁数3桁のとき、0で埋められる', arg: { v: 100, max: 3 }, expected: '100' },
      { message: '最大桁数3桁のとき、0で埋められる', arg: { v: '100', max: 3 }, expected: '100' },
      { message: '最大桁数4桁のとき、0で埋められる', arg: { v: 1, max: 4 }, expected: '0001' },
      { message: '最大桁数4桁のとき、0で埋められる', arg: { v: '1', max: 4 }, expected: '0001' },
      { message: '最大桁数4桁のとき、0で埋められる', arg: { v: 10, max: 4 }, expected: '0010' },
      { message: '最大桁数4桁のとき、0で埋められる', arg: { v: '10', max: 4 }, expected: '0010' },
      { message: '最大桁数4桁のとき、0で埋められる', arg: { v: 100, max: 4 }, expected: '0100' },
      { message: '最大桁数4桁のとき、0で埋められる', arg: { v: '100', max: 4 }, expected: '0100' },
      { message: '最大桁数4桁のとき、0で埋められる', arg: { v: 1000, max: 4 }, expected: '1000' },
      { message: '最大桁数4桁のとき、0で埋められる', arg: { v: '1000', max: 4 }, expected: '1000' }
    ] as testType[]

    testCases.forEach((testCase) => {
      it(`${testCase.message} (${testCase.arg.v} → ${testCase.expected})`, () => {
        expect(zeroFill(testCase.arg.v, testCase.arg.max)).toBe(testCase.expected)
      })
    })
  })
})

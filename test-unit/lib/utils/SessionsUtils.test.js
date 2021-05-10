import {
  encode,
  decode
} from 'lib/utils/SessionsUtils'

describe('SessionsUtils', () => {
  describe('encode', () => {
    test('when there is no informations', () => {
      const date = null
      const sessions = []
      const result = encode(date, sessions)
      const expected = btoa('0|')
      expect(result).toBe(expected)
    })
  })

  describe('decode', () => {
    test('', () => {
    })
  })
})

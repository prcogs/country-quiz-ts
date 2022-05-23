import { filterAndReduce } from 'utils/helpers/filterAndReduce'

describe('Test coverage', () => {
   test('Line test', () => {
      const i = filterAndReduce([])
      expect(i).toBe(0)
   })
})

import { renderHook, act } from '@testing-library/react'
import fetch from 'jest-fetch-mock'

import { useProvideGame } from 'utils/hooks/use-game'
import { createQuestions } from 'utils/hooks/use-game/helpers/createQuestions'

import { africa, initGame } from 'fixtures'


describe('Hook use game', () => {
   test('Create question for quiz', () => {
      const data = createQuestions(africa.dataParsed, 5)

      expect(data.length).toBe(5)
      expect(data[0].length).toBe(4)
   })

   test('Init quiz', async () => {
      fetch.mockResponseOnce(JSON.stringify(africa.data))

      const { result } = renderHook(() => useProvideGame())

      await act(async () => {
         expect(await result.current.init(initGame.numbersQuestions, (initGame.region as keyof Regions))).toBe(true)
      })

      expect(fetch).toHaveBeenCalledTimes(1)
      // domaine is undefined because, env var isn't retrieved
      // expect(fetch).toHaveBeenCalledWith(`https://restcountries.com/v3.1/region/${initGame.region}`)
      expect(result.current.questions.length).toBe(initGame.numbersQuestions)
      expect(result.current.questions[0].length).toBe(4)
   })

   test('Init quiz - Error attempt to get data', async () => {
      fetch.mockResponseOnce('error')

      const { result } = renderHook(() => useProvideGame())

      await act(async () => {
         expect(await result.current.init(initGame.numbersQuestions, (initGame.region as keyof Regions))).toBe(false)
      })

      expect(result.current.questions.length).toBe(0)
   })
})

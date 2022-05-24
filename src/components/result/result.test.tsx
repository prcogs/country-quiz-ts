import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useGame } from 'utils/hooks/use-game'

import { Result } from 'components/result'

const retryGame = jest.fn()

jest.mock('utils/hooks/use-game', jest.fn(() => ({
   useGame: jest.fn(() => ({
      retryGame,
      dataGame: {
         numberQuestions: 0,
         numberGoodResp: 0,
         actualQuestion: 0,
      },
   })),
})));


describe('Result component', () => {
   test('rendering component', () => {
      expect(render(<Result />)).toMatchSnapshot()
   })

   test('get result', async () => {
      (useGame as jest.Mock).mockImplementation(jest.fn(() => ({
         retryGame,
         dataGame: {
            numberQuestions: 2,
            numberGoodResp: 2,
            actualQuestion: 2,
         },
      })))

      render(<Result />)

      const result = screen.getByTestId<HTMLSpanElement>('result')

      expect(result.innerHTML).toBe('2')
   })

   test('retry game', async () => {
      render(<Result />)

      const btn = screen.getByTestId<HTMLButtonElement>('btn')

      await waitFor(() => fireEvent.click(btn))

      expect(retryGame).toHaveBeenCalledTimes(1)
   })
})

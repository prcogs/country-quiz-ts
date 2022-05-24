import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useGame } from 'utils/hooks/use-game'
import { Home } from 'components/home'


jest.mock('utils/hooks/use-game', () => ({
   useGame: jest.fn(),
}))

const fct = (boolean: boolean) => () => ({
   init: jest.fn((a: number, b: string | undefined) => Promise.resolve(boolean)),
})

describe('home', () => {
   // beforeAll(() => {
   //    (useGame as jest.Mock)
   //       .mockImplementation(fct(false))
   //       .mockImplementationOnce(fct(true))
   //       .mockImplementationOnce(fct(true))
   // })

   // afterAll(() => {
   //    console.log((useGame as jest.Mock).mock.calls.length, 'ddddddd')
   // })

   test('should render correctly', () => {
      (useGame as jest.Mock).mockImplementation(() => {
         return {
            init: jest.fn(),
         }
      })

      expect(render(<Home />)).toMatchSnapshot()
   });


   test('btn is call & error attempt api data', async () => {
      (useGame as jest.Mock).mockImplementation(fct(false))

      render(<Home />)

      const btn = screen.getByTestId<HTMLButtonElement>('btn')

      await waitFor(() => fireEvent.click(btn))
      expect(btn.disabled).toBe(true)

      await waitFor(() => screen.getByTestId<HTMLSpanElement>('error'))
      expect(btn.disabled).toBe(false)
      expect(screen.getByTestId<HTMLSpanElement>('error')).toBeInTheDocument()
   });


   test('btn is call & start quiz', async () => {
      (useGame as jest.Mock).mockImplementation(fct(true))

      const { getByTestId, queryByTestId } = render(<Home />)

      const btn = getByTestId('btn')

      await waitFor(() => fireEvent.click(btn))
      expect((btn as HTMLButtonElement).disabled).toBe(true)

      expect(queryByTestId('error')).toBe(null)
      await waitFor(() => {
         expect((btn as HTMLButtonElement).disabled).toBe(false)
      });
   });
})

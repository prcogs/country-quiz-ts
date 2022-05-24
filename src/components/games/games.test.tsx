import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Games } from 'components/games'
import { useGame } from 'utils/hooks/use-game';

import { africa } from 'fixtures';


const actualQuestion = 1

jest.mock('utils/hooks/use-game', jest.fn(() => ({
   useGame: jest.fn(() => ({
      dataGame: {
         numberQuestions: 4,
         numberGoodResp: 0,
         actualQuestion,
      },
      questions: africa.questions,
      nextQuestion: jest.fn(() => {}),
      oneMoreGoodAnswer: jest.fn(() => {}),
   })),
})));

describe('Games component', () => {
   // test('rendering component', () => {
   //    expect(render(<Games />)).toMatchSnapshot()
   // })

   test('has 4 answers who match with countries', () => {
      render(<Games />)

      const answers = screen.getAllByTestId('answer')
      expect(answers).toHaveLength(4)

      expect(screen.getByText(africa.questions[actualQuestion][0].name)).toBeInTheDocument()
      expect(screen.getByText(africa.questions[actualQuestion][1].name)).toBeInTheDocument()
      expect(screen.getByText(africa.questions[actualQuestion][2].name)).toBeInTheDocument()
      expect(screen.getByText(africa.questions[actualQuestion][3].name)).toBeInTheDocument()
   })


   test('answer to question', async () => {
      const { getByTestId, queryByTestId } = render(<Games />)

      const btnNext = queryByTestId('btnNext')
      expect(btnNext).not.toBeInTheDocument()

      const btn = screen.getAllByTestId('answer')
      fireEvent.click(btn[0])

      const btnNexta = getByTestId('btnNext')
      expect(btnNexta).toBeInTheDocument()
      fireEvent.click(btnNexta)

      await waitFor(() => {
         expect(btnNext).not.toBeInTheDocument()
      //    expect(screen.getByText(africa.questions[actualQuestion + 1][0].name)).toBeInTheDocument()
      //    expect(screen.getByText(africa.questions[actualQuestion + 1][1].name)).toBeInTheDocument()
      //    expect(screen.getByText(africa.questions[actualQuestion + 1][2].name)).toBeInTheDocument()
      //    expect(screen.getByText(africa.questions[actualQuestion + 1][3].name)).toBeInTheDocument()
      })
   })

   test('type of question is flag', () => {
      const { queryByTestId } = render(<Games />)

      waitFor(() => {
         const type = queryByTestId('type-flag')
         expect(type).toBeInTheDocument()
      })
   })

   test('type of question is capital', () => {
      (useGame as jest.Mock).mockImplementation(jest.fn(() => ({
         dataGame: {
            numberQuestions: 4,
            numberGoodResp: 0,
            actualQuestion: 2,
         },
         questions: africa.questions,
         nextQuestion: jest.fn(() => {}),
         oneMoreGoodAnswer: jest.fn(() => {}),
      })))

      const { queryByTestId } = render(<Games />)

      waitFor(() => {
         const type = queryByTestId('type-capital')
         expect(type).toBeInTheDocument()
      })
   })
})

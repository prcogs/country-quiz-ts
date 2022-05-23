import { useGame } from 'utils/hooks/use-game'

import { S } from 'components/result/result.styled'


export const Result = () => {
   const { dataGame, retryGame } = useGame()

   return (
      <S.StyledResult>
         <S.Title>Results</S.Title>

         <S.Para>
            {'You got '}
            <span>{dataGame.numberGoodResp}</span>
            {` / ${dataGame.numberQuestions} correct answer`}
         </S.Para>

         <S.Button type="button" onClick={() => retryGame()}>Try again</S.Button>
      </S.StyledResult>
   )
}

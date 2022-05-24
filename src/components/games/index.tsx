import { useEffect, useState } from 'react'

import { useGame } from 'utils/hooks/use-game'

import { S } from 'components/games/games.styled'

const type = {
   CAPITAL: 1,
   FLAG: 2,
}

const random = () => Math.floor(Math.random() * 4)
const LETTERS = ['A', 'B', 'C', 'D']


const Game = ({ data, isPlaying, handleAnswer, wichType }: Game) => {
   const [goodAnswer, setGoodAnswer] = useState(data[random()])
   const [response, setResponse] = useState<string | null>(null)

   const handleClick = (name: string) => {
      if (isPlaying) {
         handleAnswer(name === goodAnswer.name)
         setResponse(name)
      }
   }

   const getClassName = (name: string) => {
      if (!isPlaying) {
         if (name === goodAnswer.name) return 'success'
         if (name === response) return 'error'
         return 'none'
      }

      return ''
   }

   useEffect(() => {
      setGoodAnswer(data[random()])
   }, [data])


   return (
      <S.StyledGame data-testid="game">
         {wichType === type.CAPITAL
            ? <S.Question data-testid="type-captial">{`${goodAnswer.capital} is the capital of`}</S.Question>
            : (
               <S.Question data-testid="type-flag">
                  <S.Img src={goodAnswer.flags} alt="Flag" width={100} />
                  Wich country does this flag belong to
               </S.Question>
            )}

         <S.Cards>
            {data.map(({ name }, idx) => (
               <S.Card key={name}>
                  <button
                     type="button"
                     disabled={!isPlaying}
                     onClick={() => handleClick(name)}
                     className={getClassName(name)}
                     data-testid="answer"
                  >
                     <span>{LETTERS[idx]}</span>

                     {name}

                     {!isPlaying
                        && (
                           <S.SpanImage>
                              {name === goodAnswer.name
                                 ? <img src="/country-quiz-ts/icons/check-solid.svg" alt="Icon check" />
                                 : <img src="/country-quiz-ts/icons/xmark-solid.svg" alt="Icon cross" />}
                           </S.SpanImage>
                        )}
                  </button>
               </S.Card>
            ))}
         </S.Cards>
      </S.StyledGame>
   )
}

export const Games = () => {
   const [isPlaying, setIsPlaying] = useState(true)
   const { questions, dataGame, nextQuestion, oneMoreGoodAnswer } = useGame()

   const handleAnswer = (resp: boolean) => {
      if (resp) oneMoreGoodAnswer()
      setIsPlaying(prevState => !prevState)
   }

   const handleNext = () => {
      nextQuestion()
      setIsPlaying(prevState => !prevState)
   }

   return (
      <S.StyledGames>
         <S.Span>{`${dataGame.actualQuestion + 1} / ${dataGame.numberQuestions}`}</S.Span>

         <Game
            data={questions[dataGame.actualQuestion]}
            isPlaying={isPlaying}
            handleAnswer={handleAnswer}
            wichType={dataGame.actualQuestion % 2 === 0 ? type.CAPITAL : type.FLAG}
         />

         {!isPlaying && <S.Button type="button" onClick={() => handleNext()} data-testid="btnNext">Next</S.Button>}
      </S.StyledGames>
   )
}

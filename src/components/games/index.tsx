import { useEffect, useState } from 'react'

import { useGame } from 'utils/hooks/use-game'

import { S } from 'components/games/games.styled'

const type = {
   CAPITAL: 1,
   FLAG: 2,
}

const random = () => Math.floor(Math.random() * 4)
const letters = ['A', 'B', 'C', 'D']


const Game = ({ data, isPlaying, handleAnswer, wichType }: Game) => {
   const [goodAnswer, setGoodAnswer] = useState(data[random()])
   const [nameOfClick, setidxOfClick] = useState<string | null>(null)

   const handleClick = (name: string) => {
      handleAnswer(name === goodAnswer.name)
      setidxOfClick(name)
   }

   useEffect(() => {
      setGoodAnswer(data[random()])
   }, [data])

   const getClassName = (name: string) => {
      if (!isPlaying) {
         if (name === goodAnswer.name) return 'success'
         if (nameOfClick === name) return 'error'
         return 'none'
      }

      return ''
   }


   return (
      <S.StyledGame>
         {wichType === type.CAPITAL
            ? <S.Question>{`${goodAnswer.capital} is the capital of`}</S.Question>
            : (
               <S.Question>
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
                  >
                     <span>{letters[idx]}</span>

                     {name}

                     {!isPlaying
                        && (
                           <S.SpanImage>
                              {name === goodAnswer.name
                                 ? <img src="/icons/check-solid.svg" alt="Icon check" />
                                 : <img src="/icons/xmark-solid.svg" alt="Icon cross" />}
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

   const handlePlaying = () => {
      setIsPlaying(prevState => !prevState)
   }

   const handleAnswer = (resp: boolean) => {
      if (resp) oneMoreGoodAnswer()
      handlePlaying()
   }

   const handleNext = () => {
      handlePlaying()
      nextQuestion()
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

         {!isPlaying && <S.Button type="button" onClick={() => handleNext()}>Next</S.Button>}
      </S.StyledGames>
   )
}

import { createContext, useContext, ReactNode, useState } from 'react';

import { useRoutes } from 'utils/hooks/use-routes';
import { getCountries } from 'utils/api/request/getCountries';

type Countries = {
   capital: string[]
   flags: {
      svg?: string,
      png?: string
   }
   name: {
      common: string
   }
}

type CountriesParsed = {
   capital: string
   flags: string | undefined
   name: string
}

type PropsGameProvider = {
   children: ReactNode
}

type GameContext= {
   init: (numberQuestion: number, region: string) => Promise<boolean | undefined>
   questions: CountriesParsed[][]
   dataGame: {
      numberQuestions: number
      numberGoodResp: number
      actualQuestion: number
   }
   nextQuestion: () => void
   oneMoreGoodAnswer: () => void
   retryGame: () => void
}


const gameContext = createContext<GameContext>({
   init: async (numberQuestion, region) => false,
   questions: [],
   dataGame: {
      numberQuestions: 0,
      numberGoodResp: 0,
      actualQuestion: 0,
   },
   nextQuestion: () => {},
   oneMoreGoodAnswer: () => {},
   retryGame: () => {},
});

export const createQuestions = (countries: CountriesParsed[], numberQuestions: number) => {
   const nbrCountries = numberQuestions * 4
   const randomNumbers: number[] = []

   for (let i = 0; i < nbrCountries; i += 1) {
      let condition = true
      while (condition) {
         const random = Math.floor(Math.random() * countries.length)
         if (randomNumbers.every(nbr => nbr !== random)) {
            randomNumbers.push(random)
            condition = false
         }
      }
   }

   let allQuestions: CountriesParsed[][] = []
   for (let i = 0; i < randomNumbers.length; i += 4) {
      const singleQuestion = [
         countries[randomNumbers[i]],
         countries[randomNumbers[i + 1]],
         countries[randomNumbers[i + 2]],
         countries[randomNumbers[i + 3]],
      ]
      allQuestions = [...allQuestions, singleQuestion]
   }


   return allQuestions
}


export function useProvideGame() {
   const { changeRoute } = useRoutes()
   const [questions, setQuestions] = useState<CountriesParsed[][]>([])
   const [dataGame, setDataGame] = useState({
      numberQuestions: 0,
      numberGoodResp: 0,
      actualQuestion: 0,
   })

   const init = async (numberQuestions: number, region: string) => {
      const { data, error } = await getCountries(region)


      if (data) {
         const parsedData: CountriesParsed[] = data
            .filter(({ capital, flags, name }: Countries) => capital && flags && name)
            .map(({ capital, flags, name }: Countries) => ({
               capital: capital[0],
               flags: flags?.svg || flags?.png,
               name: name?.common,
            }))

         setQuestions(createQuestions(parsedData, numberQuestions))
         setDataGame({ ...dataGame, numberQuestions })

         return true
      }

      if (error) return false

      return false
   }

   const nextQuestion = () => {
      if (dataGame.actualQuestion + 1 >= dataGame.numberQuestions) changeRoute()
      else setDataGame({ ...dataGame, actualQuestion: dataGame.actualQuestion + 1 })
   }

   const oneMoreGoodAnswer = () => setDataGame({ ...dataGame, numberGoodResp: dataGame.numberGoodResp + 1 })

   const retryGame = () => {
      setDataGame({
         numberQuestions: 0,
         numberGoodResp: 0,
         actualQuestion: 0,
      })

      changeRoute()
   }

   return {
      init,
      questions,
      dataGame,
      nextQuestion,
      oneMoreGoodAnswer,
      retryGame,
   };
}

export function ProvideGame({ children }: PropsGameProvider) {
   const handleGameStage = useProvideGame();
   return <gameContext.Provider value={handleGameStage}>{children}</gameContext.Provider>;
}

export function useGame() {
   return useContext(gameContext);
}

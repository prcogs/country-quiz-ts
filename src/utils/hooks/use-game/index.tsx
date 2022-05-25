import { createContext, useContext, useState } from 'react';

import { useRoutes } from 'utils/hooks/use-routes';
import { getCountries } from 'utils/api/request/getCountries';
import { createQuestions } from 'utils/hooks/use-game/helpers/createQuestions';

import { regions } from 'components/home';


type GameContext= {
   // eslint-disable-next-line no-unused-vars
   init: (numberQuestion: number, region: Keyof<typeof regions>) => Promise<boolean>
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


const DATA_GAME_INIT = {
   numberQuestions: 0,
   numberGoodResp: 0,
   actualQuestion: 0,
}

const gameContext = createContext<GameContext | Record<string, never>>({});

export function useProvideGame() {
   const { changeRoute } = useRoutes()
   const [questions, setQuestions] = useState<CountriesParsed[][]>([])
   const [dataGame, setDataGame] = useState(DATA_GAME_INIT)

   const init = async (numberQuestions: number, region: Keyof<typeof regions>) => {
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

   const oneMoreGoodAnswer = () => setDataGame(prevState => ({ ...dataGame, numberGoodResp: prevState.numberGoodResp + 1 }))

   const retryGame = () => {
      setDataGame(DATA_GAME_INIT)
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

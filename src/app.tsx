import { useRoutes } from 'utils/hooks/use-routes'

import { Games } from 'components/games';
import { Home } from 'components/home'
import { Result } from 'components/result';

import { routes } from 'utils/constants/routes';

import { S } from 'app.styled';


const App = () => {
   const { HOME, GAME, RESULT } = routes
   const { route } = useRoutes()


   return (
      <>
         <S.Main>
            <S.Card>
               <p className="title">COUNTRY QUIZ</p>
               {route === HOME && <Home />}
               {route === GAME && <Games />}
               {route === RESULT && <Result />}
            </S.Card>
         </S.Main>

         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
         <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
      </>
   )
}

export default App

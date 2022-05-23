import { createContext, ReactNode, useContext, useState } from 'react';

import { routes } from 'utils/constants/routes';


type PropsRoutesProvider = {
   children: ReactNode
}

type Route = {
   route: number,
   changeRoute: () => void
}

const routesContext = createContext<Route>({
   route: routes.HOME,
   changeRoute: () => {},
});

export function useProvideRoutes() {
   const { HOME, GAME, RESULT } = routes
   const [route, setRoute] = useState(HOME)

   const changeRoute = () => {
      switch (route) {
         case HOME:
            setRoute(GAME)
            break;
         case GAME:
            setRoute(RESULT)
            break;
         case RESULT:
            setRoute(HOME)
            break;
         default:
            setRoute(HOME)
            break;
      }
   }

   return {
      route,
      changeRoute,
   };
}

export function ProvideRoutes({ children }: PropsRoutesProvider) {
   const handleRoutes = useProvideRoutes();
   return <routesContext.Provider value={handleRoutes}>{children}</routesContext.Provider>;
}

export function useRoutes() {
   return useContext(routesContext);
}

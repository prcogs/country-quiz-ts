import { createContext, ReactNode, useContext, useState } from 'react';

import { routes } from 'utils/constants/routes';


type PropsRoutesProvider = {
   children: ReactNode
}

export const routesContext = createContext<Route | Record<string, never>>({});

export function useProvideRoutes() {
   const { HOME, GAME, RESULT } = routes
   const [route, setRoute] = useState<typeof HOME | typeof GAME | typeof RESULT>(HOME)

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

import { render, renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { useProvideRoutes, routesContext } from 'utils/hooks/use-routes'

import { routes } from 'utils/constants/routes'
import App from 'app'

jest.mock('components/games', () => {
   return {
      __esModule: true,
      Games: () => {
         return <div data-testid="game" />;
      },
   };
});

jest.mock('components/result', () => {
   return {
      __esModule: true,
      Games: () => {
         return <div data-testid="result" />;
      },
   };
});


describe('Hook use routes', () => {
   test('Change route once', () => {
      const { result } = renderHook(() => useProvideRoutes())

      act(() => result.current.changeRoute())

      expect(result.current.route).toBe(routes.GAME)
   })

   test('Change route twice', () => {
      const { result } = renderHook(() => useProvideRoutes())

      act(() => result.current.changeRoute())
      act(() => result.current.changeRoute())

      expect(result.current.route).toBe(routes.RESULT)
   })

   test('Change route thrice', () => {
      const { result } = renderHook(() => useProvideRoutes())

      act(() => result.current.changeRoute())
      act(() => result.current.changeRoute())
      act(() => result.current.changeRoute())

      expect(result.current.route).toBe(routes.HOME)
   })

   test('RouteProvider retrieved good value', async () => {
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      const value = {
         route: routes.GAME,
         changeRoute: () => {},
      }

      const { getByTestId } = render(
         <routesContext.Provider value={value}>
            <App />
         </routesContext.Provider>,
      )

      const game = getByTestId('game')
      expect(game).toBeInTheDocument()
   })
})

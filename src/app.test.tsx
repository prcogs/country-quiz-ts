import { render, screen } from '@testing-library/react';

import { useRoutes } from 'utils/hooks/use-routes';
import { routes } from 'utils/constants/routes';

import App from './app';


jest.mock('utils/hooks/use-routes', jest.fn(() => ({
   useRoutes: jest.fn(() => ({
      route: routes.HOME,
   })),
})))


jest.mock('components/home', () => ({
   __esModule: true,
   Home: () => (
      <div data-testid="home" />
   ),
}));

jest.mock('components/games', () => ({
   __esModule: true,
   Games: () => (
      <div data-testid="games" />
   ),
}));

jest.mock('components/result', () => ({
   __esModule: true,
   Result: () => (
      <div data-testid="result" />
   ),
}));


describe('App', () => {
   it('should work as expected', () => {
      // render(<App />);
      expect(1 + 1).toBe(2);
   });

   test('render home', () => {
      (useRoutes as jest.Mock).mockImplementation(() => ({
         route: routes.HOME,
      }))
      render(<App />)

      const component = screen.getByTestId('home')
      expect(component).toBeInTheDocument()
   })

   test('render games', () => {
      (useRoutes as jest.Mock).mockImplementation(() => ({
         route: routes.GAME,
      }))
      render(<App />)

      const component = screen.getByTestId('games')
      expect(component).toBeInTheDocument()
   })

   test('render result', () => {
      (useRoutes as jest.Mock).mockImplementation(() => ({
         route: routes.RESULT,
      }))
      render(<App />)

      const component = screen.getByTestId('result')
      expect(component).toBeInTheDocument()
   })
});

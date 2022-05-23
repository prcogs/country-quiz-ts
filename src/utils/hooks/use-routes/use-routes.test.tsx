import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { useProvideRoutes } from 'utils/hooks/use-routes'

import { routes } from 'utils/constants/routes'


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

   test('context', () => {

   })
})

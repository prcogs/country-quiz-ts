import { useRef, useState } from 'react';

import { useGame } from 'utils/hooks/use-game';
import { useRoutes } from 'utils/hooks/use-routes'

import { S } from './home.styled'


export const regions: Regions = {
   africa: 'Africa',
   americas: 'Americas',
   asia: 'Asia',
   europe: 'Europe',
}


function getKeyByValue
   <T extends { [key: string]: string }, U extends ValueOf<T>>(object: T, value: U): keyof T | undefined {
   return Object.keys(object).find(key => object[key] === value);
}

export const Home = () => {
   const { changeRoute } = useRoutes()
   const { init } = useGame()

   const nbRef = useRef<HTMLSelectElement | null>(null)
   const regionRef = useRef<HTMLSelectElement | null>(null)

   const [error, setError] = useState<string | null>(null)
   const [isLoading, setIsLoading] = useState(false)

   const handlePlay = async () => {
      setIsLoading(true)

      const inputRefNb = Number(nbRef?.current?.value)
      const nbr = inputRefNb >= 0 && inputRefNb <= 10 ? inputRefNb : 5
      const region = (regionRef?.current?.value as ValueOf<typeof regions>) || 'Europe'
      const go = await init(nbr, getKeyByValue(regions, region) || 'europe')

      setIsLoading(false)

      if (go) changeRoute()
      else setError('Error, please retry')
   }


   return (
      <S.StyledHome data-testid="home">
         <S.Title>Hi, do you want play ?</S.Title>

         <S.Container>
            <S.Select name="nb" id="nb" ref={nbRef}>
               {Array.from({ length: 10 }, (v, i) => i + 1).map(nb => (
                  <option value={nb} key={`${nb}__`}>{nb}</option>
               ))}
            </S.Select>

            <S.Select name="region" id="region" ref={regionRef}>
               {Object.values(regions).map(region => (
                  <option value={region} key={`${region}__`}>{region}</option>
               ))}
            </S.Select>
         </S.Container>

         {error && <S.Span data-testid="error">{error}</S.Span>}

         <S.Button
            type="button"
            className={isLoading ? 'disable' : ''}
            onClick={() => handlePlay()}
            disabled={isLoading}
            data-testid="btn"
         >
            {isLoading ? 'Loading...' : 'Play'}
         </S.Button>
      </S.StyledHome>
   )
}

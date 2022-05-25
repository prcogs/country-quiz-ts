import { reqfetch } from 'utils/api'

import { regions } from 'components/home'


const COUNTRY_API = process.env.VITE_COUNTRY_API

type JSONResponse = {
   data?: Countries[]
   error?: unknown
}

export const getCountries = async (region: Keyof<typeof regions>) => {
   const { data, error }: JSONResponse = await reqfetch(`${COUNTRY_API}/region/${region}`)

   return { data, error }
}

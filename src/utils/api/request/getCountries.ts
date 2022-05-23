import { reqfetch } from 'utils/api'


const COUNTRY_API = process.env.VITE_COUNTRY_API

export const getCountries = async (region: string) => {
   const { data, error } = await reqfetch(`${COUNTRY_API}/region/${region}`)

   if (error) {
      return { error }
   }

   return { data }
}

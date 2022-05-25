
/* eslint-disable no-unused-vars */
type Countries = {
   capital: string[]
   flags: {
      svg?: string,
      png?: string
   }
   name: {
      common: string
   }
   [index: string]: unknown;
}

type CountriesParsed = {
   capital: string
   flags: string | undefined
   name: string
}

type PropsGameProvider = {
   children: ReactNode
}

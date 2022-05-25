/* eslint-disable no-unused-vars */

type Game = {
   data: CountriesParsed[]
   isPlaying: boolean
   handleAnswer: (resp: boolean) => void
   wichType: number
}

type Letters = ['A', 'B', 'C', 'D']

type Type = {
   CAPITAL: 1,
   FLAG: 2,
}

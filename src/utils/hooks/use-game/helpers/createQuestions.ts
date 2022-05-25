export const createQuestions = (countries: CountriesParsed[], numberQuestions: number) => {
   const nbrCountries = numberQuestions * 4
   const randomNumbers: number[] = []

   for (let i = 0; i < nbrCountries; i += 1) {
      let condition = true
      while (condition) {
         const random = Math.floor(Math.random() * countries.length)
         if (randomNumbers.every(nbr => nbr !== random)) {
            randomNumbers.push(random)
            condition = false
         }
      }
   }

   let allQuestions: CountriesParsed[][] = []
   for (let i = 0; i < randomNumbers.length; i += 4) {
      const singleQuestion = [
         countries[randomNumbers[i]],
         countries[randomNumbers[i + 1]],
         countries[randomNumbers[i + 2]],
         countries[randomNumbers[i + 3]],
      ]
      allQuestions = [...allQuestions, singleQuestion]
   }


   return allQuestions
}

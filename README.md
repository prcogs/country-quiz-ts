[![codecov](https://codecov.io/gh/prcogs/country-quiz-ts/branch/main/graph/badge.svg?token=DQ2361RWDZ)](https://codecov.io/gh/prcogs/country-quiz-ts)


# Country quiz

This quiz is an opportunity to visit the world. Find countries by their capital or flag.

This app work with an api to get information about countries: [Rest Countries](https://restcountries.com)


### Deployment
<p align="center"><a href="https://prcogs.github.io/country-quiz-ts/">View app</a></p>


A CD pipeline has been set up with github action and the app is hosted on github pages.


### Prerequisites
- Node.js version >=12.2.0


### Built With
   - [Vitejs](https://vitejs.dev/)
   - [React](https://reactjs.org/)
   - [Typescript](https://www.typescriptlang.org/)
   - [Styled component](https://styled-components.com/)
   - [Jest](https://jestjs.io/)
   - [Testing library](https://testing-library.com/)
   - [Eslint](https://eslint.org/)


### How to run the script

To get started, just clone the repository and run `npm install && npm run dev`:

```bash
   git clone https://github.com/prcogs/country-quiz-ts
```
Create and fill the .env file: ```VITE_COUNTRY_API = https://restcountries.com/v3.1```

```bash
   npm install
   npm run dev
```


### Running the tests
```bash
   npm run test
```

A CI pipeline has been set up to ensure quality standards, the app must have a minimum of 90% coverage to be released.

You can see the coverage details of the app in production [here](https://app.codecov.io/gh/prcogs/country-quiz-ts) or by clicking on the badge above.


## *Author Name*
[@prcogs](https://github.com/prcogs)

/* eslint-disable no-unused-vars */

type Regions = {
   africa: 'Africa',
   americas: 'Americas',
   asia: 'Asia',
   europe: 'Europe',
}

type ValueOf<T> = T[keyof T];

type Keyof<T> = keyof T

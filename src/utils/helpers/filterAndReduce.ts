

const filterAndReduce = (arr: number[]) => {
   return arr.filter(nb => nb > 10).reduce((acc, curr) => acc + curr, 0)
}

filterAndReduce([10, 28, 29])

export {
   filterAndReduce,
}

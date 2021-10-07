export const getRecordsTime = () => {
  const time = []
  for (let i = 0; i < 21; i++){
    time.push(`${10 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`)
  }
  return time
}

export const getWorksTime = () => {
  const time = []
  for (let i = 0; i < 9; i++){
    time.push(`${1 + Math.floor(i / 4)}:${i % 4 === 0 ? '00' : (i * 15) % 60}`)
  }
  return time
}

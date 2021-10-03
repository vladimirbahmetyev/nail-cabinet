import {service, serviceMock} from "../clients-page/mockFile";

type record = {
  clientId: number,
  date: Date,
  service: service,
  comment: string,
}

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




export const recordsMock : record[] = [
  {
    clientId: 1,
    date: new Date(),
    service: serviceMock[0],
    comment: '',
  },
  {
    clientId: 2,
    date: new Date(),
    service: serviceMock[2],
    comment: '',
  },
  {
    clientId: 3,
    date: new Date(),
    service: serviceMock[3],
    comment: '',
  }
]


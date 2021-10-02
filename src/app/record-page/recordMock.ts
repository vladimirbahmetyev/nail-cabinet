import {service, serviceMock} from "../clients-page/mockFile";

type record = {
  clientId: number,
  date: Date,
  service: service,
  comment: string,
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


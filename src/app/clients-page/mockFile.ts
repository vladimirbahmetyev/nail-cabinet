export type clientMock = {
  name: string,
  date: Date,
  id: number,
  services: service[]
} | null

export type service = {
  name: string,
  price: number,
  time: number,
  comment: string,
  date: Date
  id: number,
} | null

export const serviceMock: service[] = [
  {
    name: 'Гель-лак',
    price: 1200,
    date: new Date,
    time: 60,
    comment: '',
    id: 1,
  },
  {
    name: 'Маникюр',
    price: 500,
    date: new Date,
    time: 40,
    comment: '',
    id: 2,
  },
  {
    name: 'Дизайн',
    price: 200,
    date: new Date,
    time: 50,
    comment: '',
    id: 3,
  },
  {
    name: 'Укрепление',
    price: 100,
    date: new Date,
    time: 20,
    comment: '',
    id: 4,
  },
]

export const clientsMock: clientMock[] = [
  {
    name: 'John Doe',
    date: new Date,
    id: 1,
    services: serviceMock,
  },
  {
    name: 'Katya',
    date: new Date,
    id: 2,
    services: serviceMock,
  },
  {
    name: 'Vladimir',
    date: new Date,
    id: 3,
    services: serviceMock,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 4,
    services: serviceMock,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 5,
    services: serviceMock,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 6,
    services: serviceMock,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 7,
    services: serviceMock,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 8,
    services: serviceMock,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 9,
    services: serviceMock,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 10,
    services: serviceMock,
  }
]

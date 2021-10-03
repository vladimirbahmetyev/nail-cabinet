export type clientMock = {
  name: string,
  date: Date,
  id: number,
  phone: string | null,
  instagram: string | null,
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
    phone: null,
    instagram: 'dickhead'
  },
  {
    name: 'Katya',
    date: new Date,
    id: 2,
    services: serviceMock,
    phone: null,
    instagram: 'dickhead2323'
  },
  {
    name: 'Vladimir',
    date: new Date,
    id: 3,
    services: serviceMock,
    phone: '2323231',
    instagram: null,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 4,
    services: serviceMock,
    phone: '2323231',
    instagram: null,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 5,
    services: serviceMock,
    phone: '23232231',
    instagram: 'kdmfkdmf',
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: 6,
    services: serviceMock,
    phone: '23232311111',
    instagram: null,
  }
  ,
]

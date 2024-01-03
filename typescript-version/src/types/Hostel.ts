export interface Hostel {
  id: number
  title: string
  description: string
  price: string
  acreage: string
  address: string
  room: number
  emptyroom: number
  functionRoom: string
  love: number
  comment: number
  rate: number
  rateproperties: {
    name: string
    data: number[]
  }[]
  loveandcomment: {
    year: number
    value: {
      name: string
      data: number[]
    }[]
  }
  range_time_analytics: {
    start: number
    end: number
  }
  image: string | null
  imageproperties: string[]
  iduser: number
  username: string
}
export type HostelReadonly = Readonly<Hostel>

export interface NumberCost {
  // price: string
  // value: {
    name: string
    data: number[]
  //}
}
export type NumberCostReadonly = Readonly<NumberCost>
export interface NumberMostCity {
  name: string
  data: number[]
  time: string
}
export type NumberMostCityReadonly = Readonly<NumberMostCity>
// Số lượng bài đăng và phòng trọ theo tháng
export interface UserNumber {
  name: string
  data: number[]
}
export interface Posted {
  name: string
  data: number[]
  time: string
}
// Số lượng phòng trọ đã cho thuê và mới đăng
export interface TopUser {
  id: number
  name: string
  gmail: string
  money: number
  idrole: number
  rolename: string
}
export type TopUserReadonly = Readonly<TopUser>
export interface TopHostel {
  id: number
  title: string
  rate: number
  numberrates: number
  love: number
  comment: number
  image: string
  //iduser : number
  username: string
  descriptions: string
  price: string
}
export type TopHostelReadonly = Readonly<TopHostel>
export interface LoveHostel {
  id: number
  title: string
  love: number
  image: string
  username: string
  descriptions: string
  price: string
}
export type LoveHostelReadonly = Readonly<LoveHostel>
export interface NewHostel {
  id: number
  title: string
  rate: number
  numberrates: number
  love: number
  comment: number
  image: string
  //iduser : number
  username: string
  descriptions: string
  price: string
  time: string
}
export type NewHostelReadonly = Readonly<NewHostel>

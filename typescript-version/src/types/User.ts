export interface User {
  id: number
  name: string
  avatar: string | null
  gmail: string
  phone: string
  money: string
  rolename: string
  idrole: number
}

export type UserReadonly = Readonly<User>

export interface Post {
  id: number
  title: string
  descriptions: string
  time: string
  image: string | null
  iduser: number
}
export type PostReadonly = Readonly<Post>

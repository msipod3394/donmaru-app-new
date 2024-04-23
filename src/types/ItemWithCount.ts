import { Item, User } from '@/gql/graphql'

export type ItemWithCount = {
  __typename?: 'Item' | undefined
  count: number | string
  latest: string
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
  ingredients: { __typename?: 'IngredientItem' | undefined; id: string; name: string }[]
}

export type ItemObjWithCount = {
  count: string
  id: number
  createdAt: string
  updatedAt: string
  item: Item & {
    count?: string
    latest?: string
  }
  user: User
}

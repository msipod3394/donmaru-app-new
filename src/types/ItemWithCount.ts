import { Item } from '@/gql/graphql'

export type ItemWithCount = Item & {
  count?: number
}

export type ItemObjWithCount = {
  item: Item & {
    count?: number
  }
}

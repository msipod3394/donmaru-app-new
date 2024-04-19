import { Item } from '@/gql/graphql'

export type ItemWithCount = Item & {
  count?: string
}

export type ItemObjWithCount = {
  id: number | null | undefined
  count: string
  updatedAt: any
  item: Item & {
    count?: string
    latest?: string
  }
}

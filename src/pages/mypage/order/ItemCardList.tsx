import { memo } from 'react'
import { ItemCard } from './ItemCard'
import { Item, User } from '@/gql/graphql'

export type Items = {
  count: number | string
  latest: string
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
  ingredients: { __typename?: 'IngredientItem' | undefined; id: string; name: string }[]
  item: Item
}

export const ItemCardList = memo(({ items }: { items: Items[] }) => {
  return items.map((item: Items) => <ItemCard key={item.id} item={item} />)
})

import { memo } from 'react'
import { Item } from '@/gql/graphql'
import { ItemCard } from './ItemCard'

type Props = Item & {
  count: string
}

export const ItemCardList = memo(({ items }: { items: Props[] }) => {
  console.log(items)

  return items.map((item: Props) => (
    <>
      <ItemCard key={item.id} item={item} />
    </>
  ))
})

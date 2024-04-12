import { Item, User } from '@/gql/graphql'
import { ItemCard } from './ItemCard'
import { ItemCardConvert } from './ItemCardConvert'

type Props = {
  id: string
  item: Item
  user: User
  count: string
  updatedAt: string
}

export function ItemCardList({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((item: Props) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  )
}

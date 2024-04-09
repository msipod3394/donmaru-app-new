import { Item, User } from '@/gql/graphql'
import { ItemCard } from './ItemCard'
import { ItemCardConvert } from './ItemCardConvert'

type Props = {
  id: string
  item: Item
  user: User
  count: number
  updatedAt: string
}

export function ItemCardList({ items }: { items: Item[] }) {
  const selectItems = ItemCardConvert(items)
  return (
    <>
      {selectItems.map((item: Props) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  )
}

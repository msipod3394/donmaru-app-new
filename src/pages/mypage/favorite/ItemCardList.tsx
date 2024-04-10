import { Item, User } from '@/gql/graphql'
import { ItemCard } from '../components/ItemCard'
import { ItemCardConvert } from '../components/ItemCardConvert'

type Props = {
  id: string
  item: Item
  user: User
  count: number
  updatedAt: string
}

export function ItemCardList({ items }: { items: Item[] }) {
  const selectItems = ItemCardConvert(items)
  console.log('selectItems', selectItems)
  return (
    <>
      {selectItems.map((item: Props) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  )
}

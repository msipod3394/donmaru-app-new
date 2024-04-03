import { ItemCard } from './ItemCard'
import { Item } from '@/gql/graphql'

type Props = {
  itemsAll: Item[]
}

export function ItemCardList({ data }: { data: Props }) {
  console.log(data)
  const { itemsAll } = data

  return (
    <>
      {itemsAll.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </>
  )
}

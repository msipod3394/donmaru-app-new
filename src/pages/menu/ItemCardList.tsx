import { Item } from '@/gql/graphql'
import { ItemCard } from '@/components/molecules/ItemCard'

type Props = {
  itemsAll: Item[]
}

export function ItemCardList({ data }: { data: Props }) {
  console.log(data)
  // const { itemsAll } = data

  return (
    <>
      {data.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </>
  )
}

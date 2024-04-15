import { memo } from 'react'
import { ItemCard } from './ItemCard'
import { ItemWithCount } from '@/types/ItemWithCount'

export const ItemCardList = memo(({ items }: { items: ItemWithCount[] }) => {
  return items.map((item: ItemWithCount) => <ItemCard key={item.id} item={item} />)
})

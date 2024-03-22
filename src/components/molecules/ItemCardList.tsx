import React from 'react'
import { ItemCard } from '@/components/molecules/ItemCard'
import { DBDons } from '@/types/global_db.types'

export function ItemCardList({ items }: { items: DBDons[] }) {
  console.log('items', items)

  return (
    <>
      {items &&
        items.map((item: DBDons) => (
          <>
            <ItemCard key={item.id} don={item} />
          </>
        ))}
    </>
  )
}

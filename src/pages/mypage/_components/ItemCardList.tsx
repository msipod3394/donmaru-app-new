import React from 'react'
import { DonCard } from '@/components/molecules/DonCard'
import { DBDons } from '@/types/global_db.types'

export function ItemCardList({ items }: { items: DBDons[] }) {
  return (
    <>
      {items.map((order: DBDons) => (
        <DonCard key={order.id} don={order} />
      ))}
    </>
  )
}

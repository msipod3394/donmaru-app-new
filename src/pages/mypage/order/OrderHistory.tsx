import React from 'react'
import { DonCard } from '@/components/molecules/DonCard'
import { DBDons } from '@/types/global_db.types'

export function OrderHistory({ orderDons }: { orderDons: DBDons[] }) {
  return (
    <>
      {orderDons.map((order: DBDons) => (
        <DonCard key={order.id} don={order} />
      ))}
    </>
  )
}

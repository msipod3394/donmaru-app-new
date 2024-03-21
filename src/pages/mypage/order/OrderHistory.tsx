import React from 'react'
import { DonCard } from '@/components/molecules/DonCard'
import { DBDons } from '@/types/global_db.types'

export function OrderHistory({ orderDons }) {
  return (
    <>
      {orderDons.map((order: DBDons, index: React.Key | null | undefined) => (
        <DonCard key={index} don={order} />
      ))}
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { ItemCard } from '@/components/molecules/ItemCard'
import { DBDons } from '@/types/global_db.types'
import { ItemCardConvert } from '@/hooks/ItemCardConvert'

type Props = {
  id: number
  title: string
  image: string
  created_at: string
  updated_at: string
  don_id: number
}

export function ItemCardList({ items }: { items: Props[] }) {
  const selectItems = ItemCardConvert(items)

  return (
    <>
      {selectItems.map((item: DBDons) => (
        <ItemCard key={item.id} don={item} />
      ))}
    </>
  )
}

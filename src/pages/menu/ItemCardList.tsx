import React, { useEffect, useState } from 'react'
import { DBDons } from '@/types/global_db.types'
import { ItemCardConvert } from '@/hooks/ItemCardConvert'
import { ItemCard } from './ItemCard'

type Props = {
  id: number
  don_id: number
  title: string
  image: string
  created_at: string
  updated_at: string
}

export function ItemCardList({ items }: { items: Props[] }) {
  return (
    <>
      {Object.keys(items).map((key) => (
        <ItemCard key={key} item={items[key]} />
      ))}
    </>
  )
}

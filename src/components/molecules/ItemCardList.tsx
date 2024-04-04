import React, { useEffect, useState } from 'react'
import { ItemCard } from '@/components/molecules/ItemCard'
import { ItemCardConvert } from '@/hooks/ItemCardConvert'
import { Item, User } from '@/gql/graphql'

type Props = {
  id: string
  item: Item
  user: User
  count: number
  updatedAt: string
}

export function ItemCardList({ items }: { items: Item[] }) {
  const selectItems = ItemCardConvert(items)
  return (
    <>
      {selectItems.map((item: Props) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  )
}

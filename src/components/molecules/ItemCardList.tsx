import { memo } from 'react'
import { VStack } from '@chakra-ui/react'
import { ItemWithCount } from '@/types/ItemWithCount'
import { ItemCard } from './ItemCard'

export const ItemCardList = memo(({ items }: { items: ItemWithCount[] }) => {
  return (
    <>
      <VStack mb={10}>
        {items.map((item: ItemWithCount) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </VStack>
    </>
  )
})

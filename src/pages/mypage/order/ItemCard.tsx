import React, { FC, memo } from 'react'
import styled from 'styled-components'
import { Text, VStack, HStack, Image } from '@chakra-ui/react'
import { Item, Order } from '@/gql/graphql'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'

type Props = {
  item: Item & {
    count: string
  }
}

export const ItemCard = memo(({ item }: Props) => {
  console.log(item);
  
  return (
    <>
      <SBox key={item.id}>
        <Image w='80px' src={`/menu/${item.item.image}`} alt={item.item.name} />
        <SBoxIn spacing={0.5}>
          <Text size='sm' fontWeight='500'>
            {item.item.name}
          </Text>
          <HStack gap={0} flexWrap='wrap'>
            {item.item.ingredients && Array.isArray(item.item.ingredients) && (
              <>
                {Array.isArray(item.item.ingredients) &&
                  item.item.ingredients.map((ingredient, index) => (
                    <Text as='span' fontSize='xs' key={index}>
                      {index > 0 && <>・</>}
                      {ingredient.name}
                    </Text>
                  ))}
              </>
            )}
          </HStack>
          <HStack gap='.5rem'>
            {item.updatedAt && (
              <HStack gap='.25rem'>
                <Text fontSize='xs' color='gray.500'>
                  注文日 {convertFormattedDate(item.updatedAt)}
                </Text>
              </HStack>
            )}
            {item.count && (
              <HStack gap='.25rem'>
                <Text fontSize='xs' color='gray.500'>
                  過去{item.count}回注文
                </Text>
              </HStack>
            )}
          </HStack>
        </SBoxIn>
      </SBox>
    </>
  )
})

// スタイル
const SBox = styled(HStack)`
  position: relative;
  width: 100%;
  border: 2px solid #000;
  padding: 1rem;
  border-radius: 5px;
`
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`
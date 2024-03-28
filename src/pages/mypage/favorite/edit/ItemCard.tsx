import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Text, VStack, HStack, Image, Button, Link } from '@chakra-ui/react'
import { StarIcon, TimeIcon } from '@chakra-ui/icons'

type Props = {
  id: number
  title: string
  image: string
  created_at: string
  updated_at: string
  don_id: number
  order_latest: string
  count: number
  favorite: boolean
}

export const ItemCard: FC<Props> = ({ item }) => {
  const clickAddFav = () => {
    console.log('clickAddFav')
  }

  return (
    <>
      <SBox key={item.id} className={item.favorite ? '_isFavorite' : ''}>
        <Image w='80px' src={`/menu/${item.image}`} alt={item.title} />
        <SBoxIn spacing={1}>
          <Text size='sm' fontWeight='500'>
            {item.title}
          </Text>
          <HStack gap={0} flexWrap='wrap'>
            {item.dons_netas &&
              Array.isArray(item.dons_netas) &&
              item.dons_netas.map((neta: { netas: { name: string } }, index: number) => {
                const netaName = neta.netas && neta.netas.name
                return (
                  <Text as='span' fontSize='xs' key={index}>
                    {index > 0 && <>・</>}
                    {netaName}
                  </Text>
                )
              })}
          </HStack>
          <HStack gap={1}>
            {item.order_latest && (
              <>
                <TimeIcon boxSize={3} color='gray.500' />
                <HStack gap='.25rem'>
                  <Text fontSize='xs' color='gray.500'>
                    {item.order_latest}
                  </Text>
                </HStack>
              </>
            )}
            {item.count && (
              <>
                <HStack gap='.25rem'>
                  <Text fontSize='xs' color='gray.500'>
                    過去{item.count}回注文
                  </Text>
                </HStack>
              </>
            )}
          </HStack>
          <HStack gap={1}>
            <StarIcon boxSize={2} color='red.500' />
            {item.favorite ? (
              <SFavText>お気に入りに登録中です</SFavText>
            ) : (
              <SAddFavText onClick={clickAddFav}>お気に入りに追加する</SAddFavText>
            )}
          </HStack>
        </SBoxIn>
      </SBox>
    </>
  )
}

// スタイル
const SBox = styled(HStack)`
  position: relative;
  width: 100%;
  padding: 1rem;
  border: 2px solid #000;
  box-sizing: border-box;
  border-radius: 5px;

  &._isFavorite {
    border: 3px solid #ce1919;
  }
`
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`

const SFavText = styled(Text)`
  font-size: 12px;
  color: #ce1919;
`
const SAddFavText = styled(Text)`
  font-size: 12px;
  color: #ce1919;
`

import React, { FC, memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text, VStack, HStack, Image, Button, Link } from '@chakra-ui/react'
import { StarIcon, TimeIcon } from '@chakra-ui/icons'
import { DBNetas } from '@/types/global_db.types'

export const ItemCard = memo(({ item, clickAddFavorite, clickRemoveFavorite }) => {
  // const { item, clickAddFavorite, clickRemoveFavorite } = props
  console.log('item', item)

  return (
    <>
      <SBox key={item.id} className={item.favorite ? '_isFavorite' : ''}>
        <Image w='80px' src={`/menu/${item.image}`} alt={item.title} />
        <SBoxIn spacing={1}>
          {item.favorite && (
            <HStack gap={1}>
              <StarIcon boxSize={2} color='orange' />
              <SFavText>お気に入り登録中</SFavText>
            </HStack>
          )}
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
          <HStack>
            {item.favorite ? (
              <SRemoveFavText onClick={() => clickRemoveFavorite(item.id)}>
                お気に入りから削除する
              </SRemoveFavText>
            ) : (
              <SAddFavText onClick={() => clickAddFavorite(item.id)}>
                お気に入りに追加する
              </SAddFavText>
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
  padding: 1rem;
  border: 2px solid #222;
  box-sizing: border-box;
  border-radius: 5px;

  &._isFavorite {
    border: 2px solid #068e08;
    background: rgba(26, 158, 0, 0.1);
  }
`
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`

const SFavText = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: #068e08;
`
const SAddFavText = styled(Button)`
  font-size: 12px;
  color: #068e08;
  background: rgba(26, 158, 0, 0.1);
`

const SRemoveFavText = styled(Button)`
  font-size: 12px;
  color: #555;
  border: 1px solid #555;
  background: #fff;
`

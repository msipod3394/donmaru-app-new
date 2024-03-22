import React, { FC } from 'react'
import styled from 'styled-components'
import { Text, VStack, HStack, Image } from '@chakra-ui/react'
import { DBDons } from '@/types/global_db.types'

type Props = {
  don: DBDons
}

export const ItemCard: FC<Props> = ({ don }) => {
  const item = don.dons
  const updated_at = don.updated_at
  const count = don.count  
  return (
    <>
      <SBox key={item.id}>
        <Image w='80px' src={`/menu/${item.image}`} alt={item.title} />
        <SBoxIn spacing={0.5}>
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
          <HStack gap='.5rem'>
            {updated_at && (
              <>
                <HStack gap='.25rem'>
                  {/* <TimeIcon boxSize={3} color='red' /> */}
                  <Text fontSize='xs' color='gray.500'>
                    {updated_at}
                  </Text>
                </HStack>
              </>
            )}
            {count && (
              <>
                <HStack gap='.25rem'>
                  {/* <TimeIcon boxSize={3} color='red' /> */}
                  <Text fontSize='xs' color='gray.500'>
                    過去{count}回注文
                  </Text>
                </HStack>
              </>
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
  border: 2px solid #000;
  padding: 1rem;
  border-radius: 5px;
`
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`

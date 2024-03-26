import React, { FC } from 'react'
import styled from 'styled-components'
import { Text, VStack, HStack, Image } from '@chakra-ui/react'
import { DBDons } from '@/types/global_db.types'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'

type Props = {
  item: DBDons
}

export const ItemCard: FC<Props> = ({ item }) => {

  // const formattedDate = convertFormattedDate(item.updated_at)
  // console.log(formattedDate)

  return (
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
        {/* <HStack gap='.5rem'>
          {formattedDate && (
            <>
              <HStack gap='.25rem'>
                <Text fontSize='xs' color='gray.500'>
                  最終注文日：{formattedDate}
                </Text>
              </HStack>
            </>
          )}
        </HStack> */}
      </SBoxIn>
    </SBox>
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

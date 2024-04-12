import React, { FC, memo } from 'react'
import { Image, Text } from '@chakra-ui/react'
import { PageDescription } from '@/components/atoms/texts/PageDescription'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { Item } from '@/gql/graphql'

export const DisplayResultItem: FC<{ item: Item }> = memo(({ item }) => {
  console.log('結果', item)

  return (
    <>
      <Image mb='1rem' src={`/menu/${item.image}`} alt={item.name} />
      <PageTitle title={item.name} />
      <PageDescription color='#ffecec'>
        {item.ingredients && Array.isArray(item.ingredients) && (
          <>
            {Array.isArray(item.ingredients) &&
              item.ingredients.map((ingredient, index) => (
                <Text as='span' fontSize='md' key={index}>
                  {index > 0 && <>・</>}
                  {ingredient.name}
                </Text>
              ))}
          </>
        )}
      </PageDescription>
    </>
  )
})

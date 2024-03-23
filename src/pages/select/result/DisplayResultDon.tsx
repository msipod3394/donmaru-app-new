import React, { FC, memo } from 'react'
import { Image, Text } from '@chakra-ui/react'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { DBDons } from '@/types/global_db.types'

export const DisplayResultDon: FC<{ don: DBDons }> = memo(({ don }) => {
  return (
    <>
      <Image mb='1rem' src={`/menu/${don.image}`} alt='test' />
      <PageTitle title={don.title} />
      <PageDescription color='#ffecec'>
        {don.dons_netas &&
          Array.isArray(don.dons_netas) &&
          don.dons_netas.map((neta, index) => {
            const netaName = neta.netas && neta.netas.name
            return (
              <Text as='span' fontSize='md' textAlign='center' key={index}>
                {index > 0 && <>・</>}
                {netaName}
              </Text>
            )
          })}
      </PageDescription>
    </>
  )
})

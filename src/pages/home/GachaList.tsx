import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { Stack } from '@chakra-ui/react'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'

export const GachaList = memo(() => {
  const router = useRouter()

  return (
    <Stack spacing='1.5rem'>
      <ButtonRounded onClick={() => router.push('/select/omakase')} className='isArrow'>
        おまかせガチャ
      </ButtonRounded>
      <ButtonRounded
        onClick={() => router.push('/select/ingredients')}
        className='isArrow'
      >
        具材を選んでガチャ
      </ButtonRounded>
      <ButtonRounded onClick={() => router.push('/select/favorite')} className='isArrow'>
        お気に入りからガチャ
      </ButtonRounded>
    </Stack>
  )
})

// eslint-disable-next-line no-unused-vars
import React from 'react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <PageTitle title='丼丸ガチャ' />
      <PageDescription>
        本日あなたにぴったりの
        <br />
        海鮮丼を選びます 🐟
      </PageDescription>
      <Stack spacing='2rem'>
        <ButtonRounded
          onClick={() => router.push('/select/omakase/')}
          className='isArrow'
        >
          <span>おまかせガチャ</span>
        </ButtonRounded>
        <ButtonRounded
          onClick={() => router.push('/select/omakase/')}
          className='isArrow'
        >
          <span>具材を選んでガチャ</span>
        </ButtonRounded>
        <ButtonRounded
          onClick={() => router.push('/select/omakase/')}
          className='isArrow'
        >
          <span>お気に入りからガチャ</span>
        </ButtonRounded>
      </Stack>
    </>
  )
}

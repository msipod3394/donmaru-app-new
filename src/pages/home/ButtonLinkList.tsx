import React, { FC, memo } from 'react'
import { useRouter } from 'next/router'
import { Stack } from '@chakra-ui/react'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'

type Props = {
  links: { text: string; href: string }[]
}

export const ButtonLinkList: FC<Props> = memo(({ links }) => {
  const router = useRouter()

  return (
    <Stack spacing='1.5rem'>
      {links.map((link) => (
        <ButtonRounded
          key={link.text}
          onClick={() => router.push(link.href)}
          className='isArrow'
        >
          {link.text}
        </ButtonRounded>
      ))}
    </Stack>
  )
})

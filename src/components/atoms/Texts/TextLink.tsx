import React, { FC, memo } from 'react'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export const TextLink: FC<{ text: string; url: string }> = memo(({ text, url }) => {
  return (
    <Link as={NextLink} mt='1rem' href={url} textAlign='center'>
      {text}
    </Link>
  )
})

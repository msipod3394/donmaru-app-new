// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FC, ReactNode } from 'react'
import { Text } from '@chakra-ui/react'
import styled from 'styled-components'

export const PageDescription: FC<Props> = ({ children }) => {
  return (
    <>
      <SText>{children}</SText>
    </>
  )
}

// type
type Props = {
  children: ReactNode
}

// style
const SText = styled(Text)`
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: var(--size-20);
  text-align: center;
  background-color: #f3f3f3;
`

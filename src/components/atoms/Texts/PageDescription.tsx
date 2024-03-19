// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FC, ReactNode } from 'react'
import { Text } from '@chakra-ui/react'
import styled from 'styled-components'

// type
type Props = {
  children: ReactNode
  color?: String
}

export const PageDescription: FC<Props> = ({ children, color }) => {
  return (
    <>
      <SText color={color}>{children}</SText>
    </>
  )
}

// style
const SText = styled(Text)`
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-size: var(--size-18);
  color: var(--color-baseText);
  background-color: ${(props) => (props.color ? props.color : '#f3f3f3')};
`

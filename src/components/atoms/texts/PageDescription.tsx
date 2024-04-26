import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import { Text } from '@chakra-ui/react'
import styled from 'styled-components'

// type
type Props = {
  children: ReactNode
  color?: string
}

// style
const SText = styled(Text)`
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  text-align: center;
  font-size: var(--size-18);
  color: var(--color-baseText);
  background-color: ${(props) => (props.color ? props.color : '#f3f3f3')};
`

export const PageDescription: FC<Props> = memo(({ children, color }) => {
  return <SText color={color}>{children}</SText>
})

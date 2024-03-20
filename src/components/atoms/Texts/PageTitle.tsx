import { FC, memo } from 'react'
import { Heading } from '@chakra-ui/react'
import styled from 'styled-components'

// style
const SHeading = styled(Heading)`
  margin-bottom: 1.6rem;
  font-size: var(--size-32);
  font-weight: 500;
  text-align: center;
  font-family: var(--font-mincho);
`

export const PageTitle: FC<{ title: string }> = memo(({ title }) => {
  return <SHeading as='h1'>{title}</SHeading>
})

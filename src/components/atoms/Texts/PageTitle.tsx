import { FC } from 'react'
import { Heading } from '@chakra-ui/react'
import styled from 'styled-components'

export const PageTitle: FC<Props> = ({ title }) => {
  return <SHeading as='h1'>{title}</SHeading>
}

// type
type Props = {
  title: string
}

// style
const SHeading = styled(Heading)`
  margin-bottom: 1.6rem;
  font-size: var(--size-32);
  font-weight: 500;
  text-align: center;
  font-family: var(--font-mincho);
`

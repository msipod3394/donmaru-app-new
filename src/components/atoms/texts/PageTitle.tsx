import { FC, memo } from 'react'
import { Heading } from '@chakra-ui/react'
import styled from 'styled-components'

// style
const SHeading = styled(Heading)`
  margin-bottom: 1.6rem;
  font-weight: 500;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.family.heading};
  font-size: ${({ theme }) => theme.fonts.size.xl3};

  ${({ theme }) => theme.breakpoint.lg`
    font-size: ${theme.fonts.size.xl2};
  `}
`

export const PageTitle: FC<{ title: string }> = memo(({ title }) => {
  return <SHeading as='h1'>{title}</SHeading>
})

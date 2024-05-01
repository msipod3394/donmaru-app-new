import styled from 'styled-components'
import { Input } from '@chakra-ui/react'

const SBaseInput = styled(Input)`
  border: 2px solid #000;
  outline: none;
  border-radius: inherit;
  font-size: 1.2rem;
  padding: 1.5rem 1rem;

  &:hover,
  &:active {
    border: 2px solid ${({ theme }) => theme.colors.red};
    outline: none;
  }
`

export default SBaseInput

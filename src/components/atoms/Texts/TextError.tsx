import React, { FC, ReactNode, memo } from 'react'
import { Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

type Props = {
  children: ReactNode
}

export const ErrorText: FC<Props> = memo(({ children }) => {
  return <Text color='#ff1500'>{children}</Text>
})

ErrorText.propTypes = {
  children: PropTypes.node.isRequired,
}

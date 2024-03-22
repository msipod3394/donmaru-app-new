import { Box, Checkbox } from '@chakra-ui/react'
import React, { FC } from 'react'

type Props = {
  id: number
  label: string
  isChecked: boolean
  onChange: (arg0: number) => void
}

export const CheckboxItem: FC<Props> = ({ id, label, isChecked, onChange }) => {
  return (
    <>
      <Box key={id}>
        <Checkbox isChecked={isChecked} onChange={() => onChange(id)}>
          {label}
        </Checkbox>
      </Box>
    </>
  )
}

import React, { FC, memo } from 'react'
import { Box, Checkbox } from '@chakra-ui/react'

type Props = {
  id: string
  label: string
  isChecked: boolean
  onChange: (arg0: string) => void
}

export const NetaCheckbox: FC<Props> = memo(({ id, label, isChecked, onChange }) => {
  return (
    <Box key={id} w='48%'>
      <Checkbox isChecked={isChecked} onChange={() => onChange(id)}>
        {label}
      </Checkbox>
    </Box>
  )
})

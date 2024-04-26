// import React, { FC, memo } from 'react'
// import { Stack } from '@chakra-ui/react'
// import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'

// type ButtonData = {
//   func: () => void
//   text: string
//   className?: string
// }

// type Props = {
//   data: ButtonData[]
// }

// export const ActionButtons: FC<Props> = memo(({ data }) => {
//   return (
//     <Stack spacing='1rem'>
//       {data.map((item, index) => (
//         <ButtonRounded key={index} onClick={item.func} className={item.className}>
//           {item.text}
//         </ButtonRounded>
//       ))}
//     </Stack>
//   )
// })

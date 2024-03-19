import { extendTheme } from '@chakra-ui/react'

const base = {
  baseBg: '#F13B3A',
  baseText: '#222222',
  primary: '#337ab7',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#DE5D50',
  dark: '#525263',
}

const breakpoints = {
  base: '1024px',
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        // 背景色
        backgroundColor: base.baseBg,
        // テキスト
        color: base.baseText,
      },
    },
  },
  fonts: {
    heading: `"Sawarabi Mincho", serif`,
    body: `'Noto Sans JP', sans-serif`,
  },
})

export default theme

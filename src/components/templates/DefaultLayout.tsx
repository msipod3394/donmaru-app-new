import { ReactNode, memo } from 'react'
import styled from 'styled-components'
import { Box, Container, Image, HStack, VStack, Stack } from '@chakra-ui/react'
import { MenuDrawer } from '../organisms/Menu/MenuDrawer'

type DefaultLayoutProps = {
  children: ReactNode
}

export const DefaultLayout = memo(({ children }: DefaultLayoutProps) => {
  return (
    <SLayoutWrap as='main'>
      <SInner>
        <SLeftBox>
          <Image src='/common/FixLeft/FixLeft_image.png' alt='丼丸ロゴ' />
        </SLeftBox>
        <SRightBox as='section'>
          <SSRightBoxIn minW='100%'>
            <Stack w='100%' spacing='1rem'>
              {children}
            </Stack>
          </SSRightBoxIn>
        </SRightBox>
        <MenuDrawerWrapper>
          <MenuDrawer />
        </MenuDrawerWrapper>
      </SInner>
    </SLayoutWrap>
  )
})

// Layout
const SLayoutWrap = styled(Container)`
  width: 100%;
  min-width: 100%;
  padding: 0;
  margin: 0;
`

const SInner = styled(HStack)`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
`

const SLeftBox = styled(Box)`
  width: 50%;

  > img {
    margin: 0 auto;
  }
`
const SRightBox = styled(Box)`
  width: 50%;
  max-width: 390px;
  height: 100vh;
  min-height: calc(100vh - 8rem);
  overflow: hidden;
  background-color: #fff;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
`
const SSRightBoxIn = styled(VStack)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  padding: 4rem 0;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MenuDrawerWrapper = styled(Box)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`

import { FC, memo, useRef } from 'react'
import NextLink from 'next/link'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Text,
  Link,
  Box,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { MypageLinks, SelectLinks, UserLinks } from '../../SettingLink'
import { useCheckLogin } from '@/hooks/useLoginCheck'

export const MenuDrawer = memo(() => {
  // 閉じ・開きの管理
  const btnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // HoverLink コンポーネント
  const HoverLink: FC<{ text: string; href: string }> = ({ text, href }) => (
    <Box as='li'>
      <NextLink href={href} passHref>
        <Link as='span' _hover={{ textDecoration: 'underline' }} p={2} onClick={onClose}>
          {text}
        </Link>
      </NextLink>
    </Box>
  )

  // ログイン状況の呼び出し
  const user = useCheckLogin()

  // ログイン時、メールアドレスを表示
  const loggedInUserEmail = user ? `こんにちは！${user.email} さん` : null

  // 未ログイン時、ログイン・サインインへのリンクを表示
  const userLinks = user ? null : (
    <Stack>
      {UserLinks.map((link, index) => (
        <HoverLink key={index} text={link.text} href={link.href} />
      ))}
    </Stack>
  )

  return (
    <>
      {/* ハンバーガーアイコン */}
      <Button onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      
      {/* Drawer部分 */}
      <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Stack as='nav' pt='40px'>
                <Stack as='ul' mb='24px'>
                  {loggedInUserEmail ? (
                    <>
                      <Text as='b'>{loggedInUserEmail}</Text>
                      <Stack mt='24px'>
                        <HoverLink text='ホーム' href='/home' />
                      </Stack>
                    </>
                  ) : (
                    userLinks
                  )}
                </Stack>
                <Stack as='ul'>
                  {SelectLinks.map((link, index) => (
                    <HoverLink key={index} text={link.text} href={link.href} />
                  ))}
                </Stack>
                <Stack as='ul' mt='24px'>
                  {MypageLinks.map((link, index) => (
                    <HoverLink key={index} text={link.text} href={link.href} />
                  ))}
                </Stack>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
})

import React from 'react'
import { FC, memo, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  type?: 'submit' | 'button' | 'reset'
  href?: string
  onClick?: () => void
  className?: string
}

export const ButtonRounded: FC<Props> = memo(
  ({ children, type = 'button', href, onClick, className }) => {
    return (
      <SButtonRounded type={type} href={href} onClick={onClick} className={className}>
        <span>{children}</span>
      </SButtonRounded>
    )
  },
)

// 共通のボタンスタイル
const SButtonRounded = styled(Button)`
  width: 100%;
  max-width: 20rem;
  height: auto;
  margin: 0 auto;
  display: block;
  border: 3px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10rem;

  > span {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-family: ${({ theme }) => theme.fonts.family.heading};
    font-size: ${({ theme }) => theme.fonts.size.xl};

    ${({ theme }) => theme.breakpoint.lg`
      font-size: ${theme.fonts.size.xl};
    `}
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  /* isDark */
  &.isDark {
    background-color: ${({ theme }) => theme.colors.black};

    > span {
      color: ${({ theme }) => theme.colors.white};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.white};

      > span {
        color: ${({ theme }) => theme.colors.black};
      }
    }
  }

  /* isArrow */
  &.isArrow > span {
    &::after {
      content: '';
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      mask-image: url(/common/icon/arrow.svg);
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: ${({ theme }) => theme.colors.black};
      margin-left: 0.5rem;
    }

    &:hover::after {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }

  /* isFixed */
  &.isFixed {
    position: fixed;
    bottom: 1rem;
  }
`

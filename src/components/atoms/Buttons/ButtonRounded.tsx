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
  // eslint-disable-next-line react/prop-types
  ({ children, type = 'button', href, onClick, className }) => {
    return (
      <SButtonRounded type={type} href={href} onClick={onClick} className={className}>
        {children}
      </SButtonRounded>
    )
  },
)

// 共通のボタンスタイル
const SButtonRounded = styled(Button)`
  width: 100%;
  height: auto;
  border: 3px solid #000;
  background-color: #fff;
  border-radius: 10rem;

  > span {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    font-family: var(--font-mincho);
    font-weight: 500;
    line-height: 1;
    font-size: var(--size-24);
  }

  &:hover {
    background-color: #000;
    color: #fff;
  }

  /* 矢印をつける */
  &.isArrow {
    &::after {
      content: '';
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      mask-image: url(/common/icon/arrow.svg);
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: #000;
      margin-left: 0.5rem;
    }

    &:hover::after {
      background-color: #fff;
    }
  }
`

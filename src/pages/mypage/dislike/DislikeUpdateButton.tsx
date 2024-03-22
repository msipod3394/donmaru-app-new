import React from 'react'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { supabase } from '@/lib/supabase'

export function DislikeUpdateButton({ isChecked, user, onUpdate }) {
  const onSubmit = async () => {
    try {
      await onUpdate(isChecked)
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <ButtonRounded onClick={onSubmit} className='isDark'>
      更新
    </ButtonRounded>
  )
}

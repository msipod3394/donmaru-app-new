import React, { useCallback, useEffect, useState } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { useFetchDislikeData } from '@/hooks/useFetchDislikeData'
import { useFetchNetaData } from '@/hooks/useFetchNetaData'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { handleUpdate } from './handleUpdate'
import { CheckboxItem } from './CheckboxItem'
import { DBNetas } from '@/types/global_db.types'

export default function PageDislike() {
  const getUser = useLoginCheck()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    if (getUser && getUser.id) {
      setUser({
        id: getUser.id,
        email: getUser.email,
        user_name: '',
        password: '',
        created_at: '',
        updated_at: '',
      })
    }
  }, [])

  // ユーザーの苦手ネタを取得
  const { dislike } = useFetchDislikeData(user?.id || '')

  // 全てのネタデータを取得
  const { loading, ingredients } = useFetchNetaData()

  // チェックが入っているネタを管理
  const [isChecked, setIsChecked] = useState<number[]>([])

  // チェックボックスの更新
  const handleCheckbox = useCallback((id: number) => {
    setIsChecked((prevArray) => {
      const newArray = prevArray.includes(id)
        ? prevArray.filter((item) => item !== id)
        : [...prevArray, id]
      return newArray
    })
  }, [])

  // 苦手ネタをisCheckedにセット（既存チェック）
  useEffect(() => {
    if (dislike) {
      const registeredDislike = dislike.map((item: DBNetas) => item.netas.id)
      setIsChecked(registeredDislike)
    }
  }, [dislike, ingredients])

  // 苦手ネタ更新
  const onSubmit = useCallback(() => {
    if (user) {
      handleUpdate(isChecked, user)
    }
  }, [])

  return (
    <>
      <PageTitle title='苦手ネタ管理' />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {ingredients &&
            Object.values(ingredients).map((item: DBNetas) => (
              <CheckboxItem
                key={item.id}
                id={item.id}
                label={item.name}
                isChecked={isChecked.includes(item.id)}
                onChange={handleCheckbox}
              />
            ))}
          <ButtonRounded onClick={onSubmit} className='isDark'>
            更新
          </ButtonRounded>
        </>
      )}
    </>
  )
}

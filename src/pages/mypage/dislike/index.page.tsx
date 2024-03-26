import React, { useCallback, useEffect, useState } from 'react'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { useFetchNetas } from '@/hooks/fetch/useFetchNetas'
import { useFetchDislikes } from '@/hooks/fetch/useFetchDislikes'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { DBNetas, DBUser } from '@/types/global_db.types'
// ページ独自
import { handleUpdate } from './handleUpdate'
import { CheckboxItem } from './CheckboxItem'

type Dislikes = {
  netas: [id: string]
  user_id: string
}

type Netas = {
  netas: DBNetas
  don_id: number
  created_at: string
  id: number[]
  name: string
  updated_at: string
}

export default function PageDislike() {
  // ユーザー情報を取得
  const { getUser } = useCheckLogin()
  const [user, setUser] = useState<DBUser>()

  // 苦手ネタの取得
  const { fetchDislikes } = useFetchDislikes()

  // 全てのネタデータを取得
  const { fetchNetas } = useFetchNetas()

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

  // 苦手ネタ更新
  const onSubmit = useCallback(() => {
    if (user) {
      handleUpdate(isChecked, user)
    }
  }, [isChecked])

  // ユーザー情報を取得実行
  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  // 苦手ネタをisCheckedにセット（既存チェック）
  useEffect(() => {
    if (fetchDislikes) {
      const registeredDislike = fetchDislikes.map((item: Dislikes) => item.netas.id)
      setIsChecked(registeredDislike)
    }
    console.log('isChecked', isChecked)
  }, [fetchDislikes, fetchNetas])

  return (
    <>
      <PageTitle title='苦手ネタ管理' />
      {fetchNetas &&
        Object.values(fetchNetas).map((item: Netas) => {
          // console.log('item', item)
          return (
            <CheckboxItem
              key={item.id}
              id={item.id}
              label={item.name}
              isChecked={isChecked.includes(item.id)}
              onChange={handleCheckbox}
            />
          )
        })}
      <ButtonRounded onClick={onSubmit} className='isDark'>
        更新
      </ButtonRounded>
    </>
  )
}

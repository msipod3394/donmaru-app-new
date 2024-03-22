import React, { useCallback, useEffect, useState } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { useFetchDislikeData } from '@/hooks/useFetchDislikeData'
import { useFetchNetaData } from '@/hooks/useFetchNetaData'
import { Box, Checkbox } from '@chakra-ui/react'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { supabase } from '@/lib/supabase'

export default function PageDislike() {
  const getUser = useLoginCheck()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    if (getUser) {
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
  const { dislike } = useFetchDislikeData(user?.id)

  // 全てのネタデータを取得
  const { loading, ingredients } = useFetchNetaData()

  // チェックが入っているネタを管理
  const [isChecked, setIsChecked] = useState<number[]>([])

  // チェックボックスの更新
  const handleCheckbox = (id: number) => {
    setIsChecked((prevArray) => {
      const newArray = prevArray.includes(id)
        ? prevArray.filter((item) => item !== id)
        : [...prevArray, id]
      return newArray
    })
  }

  // 苦手ネタをisCheckedにセット（既存チェック）
  useEffect(() => {
    if (dislike) {
      const registeredDislike = dislike.map((item) => item.netas.id)
      setIsChecked(registeredDislike)
    }
  }, [dislike, ingredients])

  // 苦手ネタ更新
  const onSubmit = useCallback(async () => {
    try {
      // DBに登録のないネタのみ登録
      const insertPromises = isChecked.map(async (netaId) => {
        try {
          // 既存の neta_id がデータベースに登録されているか確認
          const existingRecord = await supabase
            .from('dislikes')
            .select('*')
            .eq('neta_id', netaId)

          // 返ってきたデータの中身を確認する
          const checkExistingRecord = existingRecord.data?.length === 0

          // 存在・登録チェック
          if (existingRecord.data && checkExistingRecord) {
            console.log('レコードが存在しない=>新しく挿入', netaId)
            const { data, error } = await supabase
              .from('dislikes')
              .insert([{ neta_id: netaId, user_id: user.id }])
          } else {
            console.log('登録済みID', netaId)
          }
        } catch (error) {
          console.error(error)
        }
      })

      // DBに登録のある、チェックのないネタを削除
      const deletePromises = isChecked.map(async (netaId) => {
        try {
          const joinisChecked = `(${isChecked.join(',')})`

          // 既存の neta_id がデータベースに登録されているか確認
          const existingRecords = await supabase
            .from('dislikes')
            .select('*')
            .not('neta_id', 'in', joinisChecked)

          console.log('existingRecords', existingRecords.data)

          // 各既存レコードに対して非同期操作を行う
          if (existingRecords.data) {
            await Promise.all(
              existingRecords.data.map(async (record) => {
                try {
                  const { data, error } = await supabase
                    .from('dislikes')
                    .delete()
                    .eq('neta_id', record.neta_id)
                    .eq('user_id', user.id)

                  console.log('削除済みID', record.neta_id)
                } catch (error) {
                  console.error(error)
                }
              }),
            )
          }
        } catch (error) {
          console.error(error)
        }
      })

      // 非同期処理完了まで待つ
      await Promise.all([insertPromises, deletePromises])
    } catch (error) {
      console.error('error', error)
    }
  }, [isChecked, user])

  return (
    <>
      <PageTitle title='苦手ネタ管理' />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {ingredients &&
            Object.values(ingredients).map((item) => (
              <Box key={item.id}>
                <Checkbox
                  isChecked={isChecked.includes(item.id)}
                  onChange={() => handleCheckbox(item.id)}
                >
                  {item.name}
                </Checkbox>
              </Box>
            ))}
          <ButtonRounded onClick={onSubmit} className='isDark'>
            更新
          </ButtonRounded>
        </>
      )}
    </>
  )
}

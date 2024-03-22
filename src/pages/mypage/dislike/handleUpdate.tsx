import React from 'react'
import { supabase } from '@/lib/supabase'

export async function handleUpdate(isChecked: number[], user: { id: string }) {
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
}

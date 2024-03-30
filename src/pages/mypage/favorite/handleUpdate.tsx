import { supabase } from '@/lib/supabase'

export async function handleUpdate(FavoritesIdArray: number[], user: { id: string }) {
  console.log('FavoritesIdArray', FavoritesIdArray)
  console.log('user', user)

  try {
    // DBに登録のない丼IDのみ登録
    const insertPromises = FavoritesIdArray.map(async (donId) => {
      try {
        // 既存の don_id がデータベースに登録されているか確認
        const existingRecord = await supabase
          .from('favorits')
          .select('*')
          .eq('don_id', donId)

        // 返ってきたデータの中身を確認する
        const checkExistingRecord = existingRecord.data?.length === 0

        // 存在・登録チェック
        if (existingRecord.data && checkExistingRecord) {
          console.log('レコードが存在しない=>新しく挿入', donId)
          const { data, error } = await supabase
            .from('favorits')
            .insert([{ don_id: donId, user_id: user.id }])
        } else {
          console.log('登録済みID', donId)
        }
      } catch (error) {
        console.error(error)
      }
    })

    // DBに登録のある、チェックのないネタを削除
    const deletePromises = FavoritesIdArray.map(async (donId) => {
      try {
        const joinisChecked = `(${FavoritesIdArray.join(',')})`

        // 既存の don_id がデータベースに登録されているか確認
        const existingRecords = await supabase
          .from('favorits')
          .select('*')
          .not('don_id', 'in', joinisChecked)

        console.log('existingRecords', existingRecords.data)

        // 各既存レコードに対して非同期操作を行う
        if (existingRecords.data) {
          await Promise.all(
            existingRecords.data.map(async (record) => {
              try {
                const { data, error } = await supabase
                  .from('favorits')
                  .delete()
                  .eq('don_id', record.don_id)
                  .eq('user_id', user.id)

                console.log('削除済みID', record.don_id)
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

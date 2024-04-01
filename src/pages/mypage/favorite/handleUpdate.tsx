import { supabase } from '@/lib/supabase'
import { useState, useCallback } from 'react'

// export async function handleUpdate(FavoritesIdArray: number[], user: { id: string }) {
//   console.log('FavoritesIdArray', FavoritesIdArray)
//   console.log('user', user)

//   try {
//     // DBに登録のない丼IDのみ登録
//     const insertPromises = FavoritesIdArray.map(async (donId) => {
//       try {
//         // 既存の don_id がデータベースに登録されているか確認
//         const existingRecord = await supabase
//           .from('favorits')
//           .select('*')
//           .eq('don_id', donId)

//         // 返ってきたデータの中身を確認する
//         const checkExistingRecord = existingRecord.data?.length === 0

//         // 存在・登録チェック
//         if (existingRecord.data && checkExistingRecord) {
//           console.log('レコードが存在しない=>新しく挿入', donId)
//           const { data, error } = await supabase
//             .from('favorits')
//             .insert([{ don_id: donId, user_id: user.id }])
//         } else {
//           console.log('登録済みID', donId)
//         }
//       } catch (error) {
//         console.error(error)
//       }
//     })

//     // DBに登録のある、チェックのないネタを削除
//     const deletePromises = FavoritesIdArray.map(async (donId) => {
//       try {
//         const joinisChecked = `(${FavoritesIdArray.join(',')})`

//         // 既存の don_id がデータベースに登録されているか確認
//         const existingRecords = await supabase
//           .from('favorits')
//           .select('*')
//           .not('don_id', 'in', joinisChecked)

//         console.log('existingRecords', existingRecords.data)

//         // 各既存レコードに対して非同期操作を行う
//         if (existingRecords.data) {
//           await Promise.all(
//             existingRecords.data.map(async (record) => {
//               try {
//                 const { data, error } = await supabase
//                   .from('favorits')
//                   .delete()
//                   .eq('don_id', record.don_id)
//                   .eq('user_id', user.id)

//                 console.log('削除済みID', record.don_id)
//               } catch (error) {
//                 console.error(error)
//               }
//             }),
//           )
//         }
//       } catch (error) {
//         console.error(error)
//       }
//     })

//     // 非同期処理完了まで待つ
//     await Promise.all([insertPromises, deletePromises])

//     // 処理が完了したら
//     if (allOperationsSuccessful) {
//       alert('更新に成功しました')
//     } else {
//       alert('何らかのエラーが発生しました')
//     }
//   } catch (error) {
//     console.error('error', error)
//   }
// }

export const useUpdateFavorite = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // const handleUpdate = useCallback(
  //   async (FavoritesIdArray: number[], user: { id: string }) => {
  //     setLoading(true)

  //     try {
  //       // DBに登録のない丼IDのみ登録
  //       const insertPromises = FavoritesIdArray.map(async (donId) => {
  //         try {
  //           // 既存の don_id がデータベースに登録されているか確認
  //           const existingRecord = await supabase
  //             .from('favorits')
  //             .select('*')
  //             .eq('don_id', donId)

  //           // 返ってきたデータの中身を確認する
  //           const checkExistingRecord = existingRecord.data?.length === 0

  //           // 存在・登録チェック
  //           if (existingRecord.data && checkExistingRecord) {
  //             console.log('レコードが存在しない=>新しく挿入', donId)
  //             const { data, error } = await supabase
  //               .from('favorits')
  //               .insert([{ don_id: donId, user_id: user.id }])
  //           } else {
  //             console.log('登録済みID', donId)
  //           }
  //         } catch (error: any) {
  //           console.error(error)
  //           setError(error)
  //         }
  //       })

  //       // DBに登録のある、チェックのないネタを削除
  //       const deletePromises = FavoritesIdArray.map(async (donId) => {
  //         try {
  //           const joinisChecked = `(${FavoritesIdArray.join(',')})`

  //           // 既存の don_id がデータベースに登録されているか確認
  //           const existingRecords = await supabase
  //             .from('favorits')
  //             .select('*')
  //             .not('don_id', 'in', joinisChecked)

  //           console.log('existingRecords', existingRecords.data)

  //           // 各既存レコードに対して非同期操作を行う
  //           if (existingRecords.data) {
  //             await Promise.all(
  //               existingRecords.data.map(async (record) => {
  //                 try {
  //                   const { data, error } = await supabase
  //                     .from('favorits')
  //                     .delete()
  //                     .eq('don_id', record.don_id)
  //                     .eq('user_id', user.id)
  //                   console.log('削除済みID', record.don_id)
  //                 } catch (error: any) {
  //                   console.error(error)
  //                 }
  //               }),
  //             )
  //           }
  //         } catch (error: any) {
  //           console.error(error)
  //           setError(error)
  //         }
  //       })

  //       // 非同期処理完了まで待つ
  //       await Promise.all([insertPromises, deletePromises])
  //       setLoading(false)

  //     } catch (error: any) {
  //       console.error('error', error)
  //       setError(error)
  //       setLoading(false)
  //     }
  //   },
  //   [],
  // )

  const handleUpdate = useCallback(
    async (FavoritesIdArray: number[], user: { id: string }) => {
      setLoading(true)

      // DBに登録のない丼IDのみ登録するPromiseの配列
      const insertPromises = FavoritesIdArray.map(async (donId) => {
        try {
          // 既存の don_id がデータベースに登録されているか確認
          const { data: existingRecord, error } = await supabase
            .from('favorits')
            .select('*')
            .eq('don_id', donId)

          if (error) {
            throw error
          }

          // 返ってきたデータの中身を確認する
          const checkExistingRecord = existingRecord?.length === 0

          // 存在・登録チェック
          if (existingRecord && checkExistingRecord) {
            console.log('レコードが存在しない=>新しく挿入', donId)
            // データを挿入する処理を記述
            const { data, error } = await supabase
              .from('favorits')
              .insert([{ don_id: donId, user_id: user.id }])
          } else {
            console.log('登録済みID', donId)
          }
        } catch (error) {
          console.error(error)
          setError(error)
        }
      })

      // DBに登録のある、チェックのないネタを削除するPromiseの配列
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
                } catch (error: any) {
                  console.error(error)
                }
              }),
            )
          }
        } catch (error: any) {
          console.error(error)
          setError(error)
        }
      })

      // 非同期処理完了まで待つ
      Promise.all([...insertPromises, ...deletePromises])
        .then(() => {
          console.log('非同期処理完了')
          setLoading(false)
        })
        .catch((error) => {
          console.error('error', error)
          setError(error)
          setLoading(false)
        })
    },
    [],
  )

  return {
    loading,
    error,
    handleUpdate,
  }
}

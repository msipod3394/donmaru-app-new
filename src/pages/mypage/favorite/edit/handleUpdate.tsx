import {
  AddFavoritesMutation,
  DeleteFavoritesMutation,
  Exact,
  FetchFavoriteByEmailQuery,
  InputMaybe,
} from '@/gql/graphql'
import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client'
import { useRouter } from 'next/router'

export async function handleUpdate(
  user: { email: string },
  addIds: string[] | undefined,
  deleteIds: string[] | undefined,
  addFavoritesMutation: {
    (
      options?:
        | MutationFunctionOptions<
            AddFavoritesMutation,
            Exact<{ itemIds: string | string[]; email: string }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined,
    ): Promise<FetchResult<AddFavoritesMutation>>
    (arg0: { variables: { itemIds: string[] | undefined; email: string } }): any
  },
  deleteFavoritesMutation: {
    (
      options?:
        | MutationFunctionOptions<
            DeleteFavoritesMutation,
            Exact<{ itemIds: string | string[]; email: string }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined,
    ): Promise<FetchResult<DeleteFavoritesMutation>>
    (arg0: { variables: { itemIds: string[] | undefined; email: string } }): any
  },
  refetchFavoritesByUserEmail: {
    (
      variables?: Partial<Exact<{ email?: InputMaybe<string> | undefined }>> | undefined,
    ): Promise<ApolloQueryResult<FetchFavoriteByEmailQuery>>
    (arg0: { email: string }): void
  },
): Promise<boolean> {
  console.log('addIds', addIds)
  console.log('deleteIds', deleteIds)

  try {
    await Promise.all([
      addFavoritesMutation({ variables: { itemIds: addIds, email: user.email } }),
      deleteFavoritesMutation({ variables: { itemIds: deleteIds, email: user.email } }),
    ])

    alert('お気に入りを更新しました！')

    // ユーザーのお気に入りを再取得
    await refetchFavoritesByUserEmail({ email: user.email })

    return true // 成功したので true を返す
  } catch (error) {
    console.error('エラー:', error)
    return false // エラーが発生したので false を返す
  }
}

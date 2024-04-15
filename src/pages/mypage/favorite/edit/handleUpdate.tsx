import {
  AddFavoritesMutation,
  DeleteFavoritesMutation,
  Exact,
  FetchFavoriteByIdQuery,
  InputMaybe,
} from '@/gql/graphql'
import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client'

export async function handleUpdate(
  user: { id: string },
  addIds: string[] | undefined,
  deleteIds: string[] | undefined,
  addFavoritesMutation: {
    (
      options?:
        | MutationFunctionOptions<
            AddFavoritesMutation,
            Exact<{ itemIds: string | string[]; userId: string }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined,
    ): Promise<FetchResult<AddFavoritesMutation>>
    (arg0: { variables: { itemIds: string[] | undefined; userId: string } }): any
  },
  deleteFavoritesMutation: {
    (
      options?:
        | MutationFunctionOptions<
            DeleteFavoritesMutation,
            Exact<{ itemIds: string | string[]; userId: string }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined,
    ): Promise<FetchResult<DeleteFavoritesMutation>>
    (arg0: { variables: { itemIds: string[] | undefined; userId: string } }): any
  },
  refetchFavoritesByUserId: {
    (
      variables?: Partial<Exact<{ id?: InputMaybe<string> | undefined }>> | undefined,
    ): Promise<ApolloQueryResult<FetchFavoriteByIdQuery>>
    (arg0: { userId: string }): any
  },
): Promise<boolean> {
  const userId = user.id.toString()

  try {
    await Promise.all([
      addFavoritesMutation({ variables: { itemIds: addIds, userId: userId } }),
      deleteFavoritesMutation({ variables: { itemIds: deleteIds, userId: userId } }),
    ])

    alert('お気に入りを更新しました！')

    // ユーザーのお気に入りを再取得
    await refetchFavoritesByUserId({ userId: userId })

    return true // 成功したら true を返す
  } catch (error) {
    console.error('エラー:', error)
    return false // エラーがあれば false を返す
  }
}

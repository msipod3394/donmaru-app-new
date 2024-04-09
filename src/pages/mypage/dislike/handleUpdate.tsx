import { AddDislikeMutationVariables } from '@/gql/graphql'

export async function handleUpdate(
  isChecked: number[],
  user: { email: string },
  registeredDislikes: number[],
  addDislikeMutation: (variables: AddDislikeMutationVariables) => void,
) {
  console.log('registeredDislikes', registeredDislikes)
  console.log('isChecked', isChecked)
  console.log('user', user.email)

  const addRegisterItems = isChecked.filter((item) => !registeredDislikes.includes(item))
  console.log('addRegisterItems', addRegisterItems)

  // const mutationVariablesList: AddDislikeMutationVariables[] = addRegisterItems.map(
  //   (ingredientId) => {
  //     return {
  //       ingredientId: ingredientId,
  //       email: user.email,
  //     }
  //   },
  // )

  // // ミューテーションの呼び出し
  // mutationVariablesList.forEach((variables) => {
  //   addDislikeMutation(variables)
  // })
}

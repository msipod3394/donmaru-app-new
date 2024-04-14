import { useApolloClient } from '@apollo/client'
import { Navigate } from 'react-router-dom'
import { onSignOut } from '@/shared/utils/authAction'
import { getStoredAuthToken } from '@/shared/utils/authToken'

const SignOut = () => {
  const client = useApolloClient()
  const token = getStoredAuthToken()

  if (!token) return <Navigate to='/auth/signin' />

  void onSignOut(token).then(() => {
    // sign out 成功時、取得中のクエリのキャッシュを削除する。
    void client.clearStore()
  })

  return <div>Signed Out Completed</div>
}

export default SignOut

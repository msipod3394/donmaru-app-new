import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { useApolloClient } from '@apollo/client'
import { getStoredAuthToken } from '@/shared/utils/authToken'
import { Navigate } from 'react-router-dom'
import { onSignOut } from '@/shared/utils/authAction'

export default function PageUser() {
  // ログアウト
  const client = useApolloClient()
  const token = getStoredAuthToken()

  const onSubmit = () => {
    if (!token) return <Navigate to='/auth/signin' />

    void onSignOut(token).then(() => {
      // sign out 成功時、取得中のクエリのキャッシュを削除する。
      void client.clearStore()
    })
  }

  return (
    <>
      <ButtonRounded onClick={onSubmit} className='isDark'>
        ログアウト
      </ButtonRounded>
    </>
  )
}

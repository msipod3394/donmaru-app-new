import { useRouter } from 'next/router'

// ログイン状況のチェック
export function useLoginCheck(): { id: string; email: string } | undefined {
  const router = useRouter()

  // サーバーとクライアントでローカルストレージが使えるかチェック
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage

  if (isLocalStorageAvailable) {
    // ローカルストレージにデータがあるか確認
    const isSetUser = window.localStorage.getItem('loginUser')

    if (isSetUser) {
      const jsonObject = JSON.parse(isSetUser)
      const { id, email } = jsonObject
      return { id, email }
    } else {
      console.log('ログイン画面へ')
      router.push('/login')
    }
  } else {
    console.error('ローカルストレージが利用できません')
    // または、ローカルストレージが利用できない場合の適切な処理を行う
  }
}

import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useUserContext } from '@/contexts/UserContext'

const useAuth = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')

  // グローバルにユーザー情報を扱うコンテキスト
  const [user, setUser] = useUserContext()

  // サインアップ
  const onSignUp = (email: string, password: string) => {
    supabase.auth
      .signUp({ email, password })
      .then(({ data, error: signUpError }) => {
        if (signUpError) {
          console.error('サインアップエラー:', signUpError)
          // エラー文をセット
          setMessage(`エラーが発生しました。${signUpError}`)
          throw signUpError
        } else {
          console.log('サインアップ成功！', data.user)

          // ユーザー情報をグローバルに使えるように値をセット
          setUser(data.user)

          // ローカルストレージにユーザー情報を保存
          const checkUseLocalStorage = typeof window !== 'undefined'
          if (checkUseLocalStorage) {
            localStorage.setItem('loginUser', JSON.stringify(data.user))
          }

          // ホーム画面へ遷移
          return router.push('/home') // Promiseを返すため、return
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error)
        // エラーメッセージを返す
        return Promise.reject('エラーが発生しました。')
      })
  }

  // サインイン
  const onSignIn = async (email: string, password: string) => {
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        console.log(signInError)
        throw signInError
      } else {
        console.log('ログイン成功！', data.user)

        // ユーザー情報をグローバルに使えるように値をセット
        setUser(data.user)
        // setUser({
        //   id: data.user.id,
        //   email: data.user.email,
        //   user_name: data.user.user_name,
        //   password: data.user.password,
        //   created_at: data.user.created_at,
        //   updated_at: data.user.updated_at,
        // })

        // ローカルストレージにユーザー情報を保存
        const checkUseLocalStorage = typeof window !== 'undefined'
        if (checkUseLocalStorage) {
          localStorage.setItem('loginUser', JSON.stringify(data.user))
        }

        // ホーム画面へ遷移
        return router.push('/home') // Promiseを返すため、return
      }
    } catch (error) {
      alert('エラーが発生しました')
      console.log(message)
      return message // エラーメッセージを返す
    }
  }

  // ユーザー情報を更新
  const onDataUpdata = async (newUserName: string | undefined, email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ user_name: newUserName })
        .eq('email', email)
        .select()
    } catch (error) {
      alert('エラーが発生しました')
    }
  }

  // セッションを更新
  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getSession()

    // セッションがあるときだけ現在ログインしているユーザーを取得する
    console.log(data)

    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数
      const {
        data: { user },
      } = await supabase.auth.getUser()
    }
  }

  return {
    onSignUp,
    onSignIn,
    onDataUpdata,
    getCurrentUser,
    errorMessage: message,
  }
}

export default useAuth

import { AuthFormInput } from '@/types/AuthFormInput'

// 送信処理
export const handleSubmit = async (data: AuthFormInput, func: Function) => {
  try {
    await func(data.email, data.password)
  } catch (error: any) {
    console.error('処理に失敗しました:', error.message)
  }
}

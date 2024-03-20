import { SignUpFormInput } from '@/types/SignUpFormInput'

// 送信処理
export const handleSubmit = async (data: SignUpFormInput, func: Function) => {
  try {
    await func(data.email, data.password)
  } catch (error: any) {
    console.error('処理に失敗しました:', error.message)
  }
}

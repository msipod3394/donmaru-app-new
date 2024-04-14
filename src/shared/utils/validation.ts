import { regexp } from "./regexp";

export const validation = {
  required: '値を入力してください',
  pattern: {
    email: { value: regexp.email, message: '有効なメールアドレスを入力してください' },
    password: { value: regexp.password, message: '英数字8文字以上24文字以内で入力してください'}
  },
  validate: {
    confirm: (targetValue: unknown, value: unknown, name?: string) => targetValue === value || `${name || '値'}が一致しません`
  }
}

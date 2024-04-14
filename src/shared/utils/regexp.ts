// 正規表現
export const regexp = {
  email:
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$|^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*(\+[A-Za-z0-9_.-]*){0,1}@gmail\.com$/,
  password: /^[A-Za-z0-9]{8,24}$/,
}

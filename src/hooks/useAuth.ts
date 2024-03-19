import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLoginUser } from "@/provider/LoginUserContext";

const useAuth = () => {
  const router = useRouter();
  // const supabase = createClientComponentClient<Database>();

  const [message, setMessage] = useState("");

  // useLoginUser（LoginUserProvider）の呼び出し
  const { loginUser, setUser } = useLoginUser();

  // サインアップ
  const onSignUp = (email: string, password: string) => {
    supabase.auth
      .signUp({ email, password })
      .then(({ data, error: signUpError }) => {
        if (signUpError) {
          console.error("サインアップエラー:", signUpError);
          // エラー文をセット
          setMessage(`エラーが発生しました。${signUpError}`);
          throw signUpError;
        } else {
          console.log("サインアップ成功:", data.user);
          router.push("/login");
        }
      })
      .catch((error) => {
        // alert("エラーが発生しました");
        console.log(message);
        return message; // エラーメッセージを返す
      });
  };

  // サインイン
  const onSignIn = async (email: string, password: string) => {
    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      console.log(data);
      if (signInError) {
        console.log(signInError);
        throw signInError;
      }
      await router.push("/home");
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  // 情報変更
  const [currentUser, setCurrentUser] = useState("");

  const onDataUpdata = async (
    newUserName: string | undefined,
    email: string
  ) => {
    try {
      // ユーザー情報を更新
      const { data, error } = await supabase
        .from("users")
        .update({ user_name: newUserName })
        .eq("email", email)
        .select();
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  // セッションを更新
  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getSession();

    console.log(data);
    // セッションがあるときだけ現在ログインしているユーザーを取得する

    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // セッションをProviderに保存
      if (user) {
        setUser(user);
      }
    }
  };

  return {
    onSignUp,
    onSignIn,
    onDataUpdata,
    getCurrentUser,
    errorMessage: message, // エラーメッセージを外部に公開
  };
};

export default useAuth;

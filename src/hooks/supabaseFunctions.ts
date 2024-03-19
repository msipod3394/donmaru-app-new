import { supabase } from "@/lib/supabase";
import { DBDislikes, DBDons, DBNetas, DBOrders } from "@/types/global_db.types";

// 全ての丼を取得
export const getAllDons: () => Promise<DBDons[]> = async () => {
  const dons = await supabase
    .from("dons")
    .select("*,  dons_netas( netas( * ) )");
  return dons.data as DBDons[];
};

// 全てのお気に入り丼を取得
export const getAllFavoriteDons = async () => {
  const favoritseDons = await supabase
    .from("favorits")
    .select(`*,  dons( *, dons_netas( netas( * ) ) )`);
  return favoritseDons.data;
};

// 全てのお気に入りではない丼を取得
export const getNotFavoriteDons = async (favoriteid: number[]) => {
  const result = `(${favoriteid.join(",")})`;
  const unFavoritseDons = await supabase
    .from("dons")
    .select(`*`)
    .not("id", "in", result);
  return unFavoritseDons.data;
};

// 全てのネタを取得
export const getAllNetas: () => Promise<DBNetas[]> = async () => {
  const dons = await supabase.from("netas").select("*");
  return dons.data as DBNetas[];
};

// 全ての苦手ネタを取得
export const getAllDislikeNetas: () => Promise<DBDislikes[]> = async () => {
  const dons = await supabase.from("dislikes").select("*");
  return dons.data as DBDislikes[];
};

// ユーザーの履歴を取得
export const getAllOrder: (userID: string) => Promise<DBOrders[]> = async (
  userID
) => {
  // don_idと最終注文日のみ取得
  const order = await supabase
    .from("orders")
    .select("don_id, updated_at")
    .eq("user_id", userID);
  return order.data as DBOrders[];
};

// ユーザーのセッションを取得
export const getUserSession = async () => {
  // const supabase = createServerComponentClient({ cookies });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};


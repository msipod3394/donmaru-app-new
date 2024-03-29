import { Database } from '@/types/database.types'

export type DBDislikes = Database['public']['Tables']['dislikes']['Row']
// export type DBDons = Database["public"]["Tables"]["dons"]["Row"];

export type DBDons = {
  dons_netas?: boolean
  // find(arg0: (don: DBDons) => boolean): unknown
  // map(arg0: (item: { item: DBDons }) => import("react").JSX.Element): unknown
  // count: any
  // length: number
  id: number
  title: string
  image: string
  created_at: string
  updated_at: string
}
export type DBDons_netas = Database['public']['Tables']['dons_netas']['Row']
export type DBFavorits = Database['public']['Tables']['favorits']['Row']
export type DBNetas = Database['public']['Tables']['netas']['Row']
export type DBOrders = Database['public']['Tables']['orders']['Row']
export type DBUser = Database['public']['Tables']['users']['Row']

export type Neta = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type DonsNetas = {
  netas: {
    id: number
    name: string
    created_at: string
    updated_at: string
  }
}

export type Don = {
  id: number
  image: string
  title: string
  created_at: string
  dons_netas: DonsNetas[]
  updated_at: string
}

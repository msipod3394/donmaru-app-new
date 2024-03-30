import { DBNetas } from './global_db.types'

type DonsNetas = {
  netas: DBNetas[]
}

type Don = {
  id: number
  title: string
  image: string
  created_at: string
  updated_at: string
  dons_netas: DonsNetas[]
}

export type FetchItemsResponse = Don[]

type Neta = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

type DonsNetas = {
  netas: Neta[]
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

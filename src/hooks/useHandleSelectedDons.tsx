import { DBDons } from '@/types/global_db.types'

export function useHandleSelectedDons(dons: DBDons[]) {
  if (dons && dons.length > 0) {
    const selectedId = Math.floor(Math.random() * dons.length)
    // const selectedDonId = dons[selectedId].id

    // console.log(selectedDonId)

    return selectedId
  }
}

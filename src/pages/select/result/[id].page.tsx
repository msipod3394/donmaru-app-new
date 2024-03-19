import { useLoadingState } from '@/hooks/useLoadingState'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Image, Stack, Text } from '@chakra-ui/react'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { useAppContext } from '@/contexts/AppContext'

export default function PageResult() {
  const router = useRouter()
  const resultId = router.query.id
  const [dons] = useAppContext()
  // const [loading, setLoading] = useState<Boolean>(true)
  const loading = useLoadingState()

  // 必要なデータが取得できなかったら、ホームヘリダイレクト
  useEffect(() => {
    console.log('dons', dons)

    if (!resultId || !dons || Object.keys(dons).length === 0) {
      router.push('/')
    }
  }, [resultId, dons, router])

  return (
    <>
      {loading ? (
        <p>読み込み中</p>
      ) : (
        <>
          <PageTitle title='へいお待ち!' />
          <Image mb='1rem' src={`/menu/${dons[resultId].image}`} alt='test' />
          <PageTitle title={dons[resultId].title} />
          <PageDescription color='#ffecec'>
            {dons[resultId].dons_netas &&
              Array.isArray(dons[resultId].dons_netas) &&
              dons[resultId].dons_netas.map((neta, index) => {
                const netaName = neta.netas && neta.netas.name
                return (
                  <Text as='span' fontSize='md' textAlign='center' key={index}>
                    {index > 0 && <>・</>}
                    {netaName}
                  </Text>
                )
              })}
          </PageDescription>
          <Stack spacing='1rem'>
            <ButtonRounded
              onClick={() => router.push('/select/omakase/')}
              className='isDark'
            >
              注文履歴に追加する
            </ButtonRounded>
            <ButtonRounded onClick={() => router.push('/')} className='isArrow'>
              もう一回ガチャする
            </ButtonRounded>
          </Stack>
        </>
      )}
    </>
  )
}

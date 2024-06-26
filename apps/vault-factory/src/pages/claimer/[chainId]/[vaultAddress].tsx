import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { vaultAddressAtom, vaultChainIdAtom } from 'src/atoms'
import { SupportedNetwork } from 'src/types'
import { isAddress } from 'viem'
import { allVaultStepInfo } from '@components/CreateVaultStepInfo'
import { DeployedVaultInfo } from '@components/DeployedVaultInfo'
import { SetClaimerForm } from '@components/forms/SetClaimerForm'
import { Layout } from '@components/Layout'
import { StepInfo } from '@components/StepInfo'
import { SUPPORTED_NETWORKS } from '@constants/config'

export default function ClaimerPage() {
  const router = useRouter()

  const setVaultChainId = useSetAtom(vaultChainIdAtom)
  const setVaultAddress = useSetAtom(vaultAddressAtom)

  if (router.isReady) {
    const chainId =
      !!router.query.chainId &&
      typeof router.query.chainId === 'string' &&
      SUPPORTED_NETWORKS.includes(parseInt(router.query.chainId))
        ? (parseInt(router.query.chainId) as SupportedNetwork)
        : undefined

    const address =
      !!router.query.vaultAddress &&
      typeof router.query.vaultAddress === 'string' &&
      isAddress(router.query.vaultAddress)
        ? router.query.vaultAddress
        : undefined

    if (!!chainId && !!address) {
      setVaultChainId(chainId)
      setVaultAddress(address)

      return (
        <Layout isSidebarActive={true}>
          <div className='w-full flex flex-col grow gap-8 lg:flex-row lg:gap-4'>
            <div className='flex flex-col shrink-0 gap-8 items-center p-6 bg-pt-transparent lg:w-[27rem] lg:py-0 lg:pl-2 lg:pr-6 lg:bg-transparent'>
              <ClaimerStepInfo />
              <DeployedVaultInfo className='w-full' />
            </div>
            <ClaimerStepContent />
          </div>
        </Layout>
      )
    } else {
      router.replace('/')
    }
  }
}

const ClaimerStepInfo = () => {
  return (
    <StepInfo
      step={0}
      stepInfo={[allVaultStepInfo[5]]}
      setStep={() => {}}
      className='grow items-center justify-center lg:items-start'
    />
  )
}

const ClaimerStepContent = () => {
  return (
    <div className='flex grow items-center justify-center px-4 lg:px-0'>
      <SetClaimerForm isOnlyStep={true} />
    </div>
  )
}

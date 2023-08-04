import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useSendDeployLiquidationPairTransaction } from '@pooltogether/hyperstructure-react-hooks'
import { useAddRecentTransaction, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { createDeployLiquidationPairTxToast, TransactionButton } from '@shared/react-components'
import { PairCreateInfo } from '@shared/types'
import { liquidationPairFactoryABI } from '@shared/utilities'
import classNames from 'classnames'
import { useSetAtom } from 'jotai'
import { liquidationPairAddressAtom } from 'src/atoms'
import { SupportedNetwork } from 'src/types'
import { Address, decodeEventLog } from 'viem'
import { useLiquidationPairInfo } from '@hooks/useLiquidationPairInfo'

interface DeployLiquidationPairButtonProps {
  chainId: SupportedNetwork
  vaultAddress: Address
  onSuccess?: () => void
  className?: string
  innerClassName?: string
}

export const DeployLiquidationPairButton = (props: DeployLiquidationPairButtonProps) => {
  const { chainId, vaultAddress, onSuccess, className, innerClassName } = props

  const liquidationPair = useLiquidationPairInfo(chainId, vaultAddress)

  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const addRecentTransaction = useAddRecentTransaction()

  const setLiquidationPairAddress = useSetAtom(liquidationPairAddressAtom)

  const {
    isWaiting: isWaitingDeploy,
    isConfirming: isConfirmingDeploy,
    isSuccess: isSuccessfulDeploy,
    txHash: deployTxHash,
    sendDeployLiquidationPairTransaction
  } = useSendDeployLiquidationPairTransaction(liquidationPair as PairCreateInfo, {
    onSend: (txHash) => {
      createDeployLiquidationPairTxToast({ chainId, txHash, addRecentTransaction })
    },
    onSuccess: (txReceipt) => {
      const event = decodeEventLog({ abi: liquidationPairFactoryABI, ...txReceipt.logs[0] })
      const liquidationPairAddress = event.args.pair
      setLiquidationPairAddress(liquidationPairAddress)
      onSuccess?.()
    }
  })

  const deployLiquidationPairEnabled = !!sendDeployLiquidationPairTransaction

  return (
    <TransactionButton
      chainId={chainId}
      isTxLoading={isWaitingDeploy || isConfirmingDeploy}
      isTxSuccess={isSuccessfulDeploy}
      write={sendDeployLiquidationPairTransaction}
      txHash={deployTxHash}
      txDescription={`Deploy Liquidation Pair`}
      disabled={!deployLiquidationPairEnabled}
      openConnectModal={openConnectModal}
      openChainModal={openChainModal}
      addRecentTransaction={addRecentTransaction}
      color='purple'
      className={classNames(
        '!bg-pt-purple-600 !border-pt-purple-600 hover:!bg-pt-purple-700 focus:outline-transparent',
        className
      )}
      innerClassName={classNames(
        'flex gap-2 items-center text-pt-purple-50 whitespace-nowrap',
        innerClassName
      )}
    >
      Deploy Liquidation Pair <ArrowRightIcon className='w-4 h-4' />
    </TransactionButton>
  )
}

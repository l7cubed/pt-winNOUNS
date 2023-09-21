import { Vaults } from '@generationsoftware/hyperstructure-client-js'
import { TokenWithPrice, TokenWithSupply } from '@shared/types'
import { getAssetsFromShares } from '@shared/utilities'
import { useMemo } from 'react'
import { Address, formatEther, parseEther } from 'viem'
import {
  useAllVaultExchangeRates,
  useAllVaultShareData,
  useAllVaultTokenAddresses,
  useAllVaultTokenPrices
} from '..'

/**
 * Returns share prices for all given vaults
 * @param vaults instance of the `Vaults` class
 * @returns
 */
export const useAllVaultSharePrices = (vaults: Vaults) => {
  const {
    data: allShareData,
    isFetched: isFetchedAllShareData,
    refetch: refetchAllShareData
  } = useAllVaultShareData(vaults)

  const {
    data: allTokenPrices,
    isFetched: isFetchedAllTokenPrices,
    refetch: refetchAllTokenPrices
  } = useAllVaultTokenPrices(vaults)

  const {
    data: allExchangeRates,
    isFetched: isFetchedAllExchangeRates,
    refetch: refetchAllExchangeRates
  } = useAllVaultExchangeRates(vaults)

  const { data: allTokenAddresses, isFetched: isFetchedAllTokenAddresses } =
    useAllVaultTokenAddresses(vaults)

  const data = useMemo(() => {
    if (!!allShareData && !!allTokenPrices && !!allExchangeRates && !!allTokenAddresses) {
      const sharePrices: { [vaultId: string]: TokenWithSupply & TokenWithPrice } = {}

      Object.entries(allShareData).forEach(([vaultId, shareToken]) => {
        const chainId = parseInt(vaultId.split('-')[1])
        const tokenAddress = allTokenAddresses.byVault[vaultId].toLowerCase() as Address
        const tokenPrice = allTokenPrices[chainId]?.[tokenAddress]
        const exchangeRate = allExchangeRates[vaultId]

        const sharePrice =
          !!exchangeRate && !!tokenPrice
            ? parseFloat(
                formatEther(
                  getAssetsFromShares(
                    parseEther(`${tokenPrice}`),
                    exchangeRate,
                    shareToken.decimals
                  )
                )
              )
            : undefined

        sharePrices[vaultId] = { ...shareToken, price: sharePrice }
      })

      return sharePrices
    }
  }, [allShareData, allTokenPrices, allExchangeRates, allTokenAddresses])

  const isFetched =
    isFetchedAllShareData &&
    isFetchedAllTokenPrices &&
    isFetchedAllExchangeRates &&
    isFetchedAllTokenAddresses

  const refetch = () => {
    refetchAllShareData()
    refetchAllTokenPrices()
    refetchAllExchangeRates()
  }

  return { data, isFetched, refetch }
}

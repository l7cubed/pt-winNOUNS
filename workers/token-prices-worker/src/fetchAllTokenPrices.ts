import { Address } from 'viem'
import { NETWORK_KEYS, SUPPORTED_NETWORKS } from './constants'
import { ChainTokenPrices, TokenPrices } from './types'

export const fetchAllTokenPrices = async () => {
  try {
    const allTokenPrices: Partial<TokenPrices> = {}

    await Promise.allSettled(
      SUPPORTED_NETWORKS.map((chainId) =>
        (async () => {
          const { value: chainTokenPrices } = await TOKEN_PRICES.getWithMetadata(
            NETWORK_KEYS[chainId]
          )
          if (!!chainTokenPrices) {
            const parsedChainTokenPrices = JSON.parse(chainTokenPrices) as ChainTokenPrices
            Object.keys(parsedChainTokenPrices).forEach((strAddress) => {
              const address = strAddress as Address
              parsedChainTokenPrices[address].splice(1)
            })
            allTokenPrices[chainId] = parsedChainTokenPrices
          }
        })()
      )
    )

    return JSON.stringify(allTokenPrices)
  } catch (e) {
    return null
  }
}

import { Address } from 'viem'
import { TOKEN_PRICES_API_URL, USE_TOKEN_PRICES_BOUND_WORKER } from './constants'
import { Network, TokenPricesApiResponse } from './types'

export const getTokenPrices = async (chainId: Network, tokenAddresses: Address[]) => {
  try {
    const url = new URL(`${TOKEN_PRICES_API_URL}/${chainId}`)
    const tokenPrices: { [address: Address]: number } = {}

    if (!!tokenAddresses.length) {
      url.searchParams.set('tokens', tokenAddresses.join(','))

      const response = USE_TOKEN_PRICES_BOUND_WORKER
        ? await TOKEN_PRICES.fetch(url.toString())
        : await fetch(url.toString())
      const rawTokenPrices = await response.json<TokenPricesApiResponse>()

      Object.keys(rawTokenPrices).forEach((key) => {
        const address = key as Lowercase<Address>
        tokenPrices[address] = rawTokenPrices[address][0]?.price
      })
    }

    return tokenPrices
  } catch (e) {
    console.error(e)
    return {}
  }
}

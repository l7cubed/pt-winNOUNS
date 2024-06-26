import { NETWORK } from '@shared/utilities'
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia
} from 'viem/chains'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = {
  mainnets: [NETWORK.mainnet, NETWORK.optimism, NETWORK.base, NETWORK.arbitrum],
  testnets: [NETWORK.optimism_sepolia, NETWORK.arbitrum_sepolia, NETWORK.base_sepolia]
} as const

/**
 * Wagmi networks
 */
export const WAGMI_CHAINS = {
  [NETWORK.mainnet]: mainnet,
  [NETWORK.optimism]: optimism,
  [NETWORK.arbitrum]: arbitrum,
  [NETWORK.base]: base,
  [NETWORK.optimism_sepolia]: optimismSepolia,
  [NETWORK.arbitrum_sepolia]: arbitrumSepolia,
  [NETWORK.base_sepolia]: baseSepolia
} as const

/**
 * RPCs
 */
export const RPC_URLS = {
  [NETWORK.mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  [NETWORK.optimism]: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL,
  [NETWORK.arbitrum]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
  [NETWORK.base]: process.env.NEXT_PUBLIC_BASE_RPC_URL,
  [NETWORK.optimism_sepolia]: process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC_URL,
  [NETWORK.arbitrum_sepolia]: process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL,
  [NETWORK.base_sepolia]: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL
} as const

/**
 * Queries' start blocks
 */
export const QUERY_START_BLOCK: { [chainId: number]: bigint } = {
  [NETWORK.optimism]: 118_900_000n,
  [NETWORK.arbitrum]: 216_345_400n,
  [NETWORK.base]: 14_506_800n,
  [NETWORK.optimism_sepolia]: 10_793_300n,
  [NETWORK.arbitrum_sepolia]: 48_888_900n,
  [NETWORK.base_sepolia]: 10_578_500n
}

/**
 * Draw results URL
 */
export const DRAW_RESULTS_URL: { [chainId: number]: string } = {
  [NETWORK.optimism]: `https://raw.githubusercontent.com/GenerationSoftware/pt-v5-winners/main/winners/vaultAccounts/${NETWORK.optimism}`,
  [NETWORK.arbitrum]: `https://raw.githubusercontent.com/GenerationSoftware/pt-v5-winners/main/winners/vaultAccounts/${NETWORK.arbitrum}`,
  [NETWORK.base]: `https://raw.githubusercontent.com/GenerationSoftware/pt-v5-winners/main/winners/vaultAccounts/${NETWORK.base}`,
  [NETWORK.optimism_sepolia]: `https://raw.githubusercontent.com/GenerationSoftware/pt-v5-winners/main/winners/vaultAccounts/${NETWORK.optimism_sepolia}`,
  [NETWORK.arbitrum_sepolia]: `https://raw.githubusercontent.com/GenerationSoftware/pt-v5-winners/main/winners/vaultAccounts/${NETWORK.arbitrum_sepolia}`,
  [NETWORK.base_sepolia]: `https://raw.githubusercontent.com/GenerationSoftware/pt-v5-winners/main/winners/vaultAccounts/${NETWORK.base_sepolia}`
}

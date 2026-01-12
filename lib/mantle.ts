import { createPublicClient, http, formatEther, formatGwei } from 'viem';
import { mantle } from 'viem/chains';

// Mantle Mainnet Public Client
export const mantleClient = createPublicClient({
  chain: mantle,
  transport: http('https://rpc.mantle.xyz'),
});

// Types
export interface BlockData {
  number: bigint;
  hash: string;
  timestamp: bigint;
  transactions: string[] | object[];
  gasUsed: bigint;
  gasLimit: bigint;
  baseFeePerGas?: bigint;
}

export interface NetworkStats {
  blockNumber: number;
  gasPrice: string;
  baseFee: string;
  blockTime: number;
  tps: number;
}

// Get latest block number
export async function getBlockNumber(): Promise<number> {
  const blockNumber = await mantleClient.getBlockNumber();
  return Number(blockNumber);
}

// Get block by number
export async function getBlock(blockNumber?: bigint): Promise<BlockData | null> {
  try {
    const block = await mantleClient.getBlock({
      blockNumber,
      includeTransactions: false,
    });
    return block as BlockData;
  } catch (error) {
    console.error('Error fetching block:', error);
    return null;
  }
}

// Get latest blocks
export async function getLatestBlocks(count: number = 5): Promise<BlockData[]> {
  const latestBlockNumber = await mantleClient.getBlockNumber();
  const blocks: BlockData[] = [];

  for (let i = 0; i < count; i++) {
    const blockNumber = latestBlockNumber - BigInt(i);
    const block = await getBlock(blockNumber);
    if (block) {
      blocks.push(block);
    }
  }

  return blocks;
}

// Get current gas price
export async function getGasPrice(): Promise<string> {
  const gasPrice = await mantleClient.getGasPrice();
  return formatGwei(gasPrice);
}

// Get network stats
export async function getNetworkStats(): Promise<NetworkStats> {
  const [blockNumber, gasPrice, block] = await Promise.all([
    mantleClient.getBlockNumber(),
    mantleClient.getGasPrice(),
    mantleClient.getBlock(),
  ]);

  // Calculate approximate TPS from latest block
  const txCount = Array.isArray(block.transactions) ? block.transactions.length : 0;
  // Mantle has ~2 second block time
  const tps = Math.round(txCount / 2);

  return {
    blockNumber: Number(blockNumber),
    gasPrice: formatGwei(gasPrice),
    baseFee: block.baseFeePerGas ? formatGwei(block.baseFeePerGas) : '0',
    blockTime: 2000, // Mantle ~2s block time
    tps,
  };
}

// Get transaction count for a block
export async function getBlockTransactionCount(blockNumber: bigint): Promise<number> {
  const count = await mantleClient.getBlockTransactionCount({
    blockNumber,
  });
  return count;
}

// Format block for display
export function formatBlockForDisplay(block: BlockData) {
  return {
    number: Number(block.number),
    hash: block.hash,
    timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
    txCount: Array.isArray(block.transactions) ? block.transactions.length : 0,
    gasUsed: formatEther(block.gasUsed),
    gasLimit: formatEther(block.gasLimit),
  };
}

// Chain info
export const MANTLE_CHAIN_INFO = {
  id: 5000,
  name: 'Mantle',
  network: 'mantle',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: { http: ['https://rpc.mantle.xyz'] },
    public: { http: ['https://rpc.mantle.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Mantle Explorer', url: 'https://explorer.mantle.xyz' },
  },
};

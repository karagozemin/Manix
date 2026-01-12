"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { mantleClient, type BlockData, type TransactionData, getLatestTransactions, truncateAddress, truncateHash, formatMNT } from '@/lib/mantle';
import { formatGwei, formatEther } from 'viem';

// Types
export interface MantleBlock {
  number: number;
  hash: string;
  timestamp: number;
  txCount: number;
  gasUsed: string;
}

export interface MantleStats {
  blockNumber: number;
  gasPrice: string;
  baseFee: string;
  tps: number;
  peakTps: number;
}

export interface MantleTransaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  timestamp: number;
  type: 'transfer' | 'contract' | 'deploy';
}

// TPS/Gas history for charts
export interface HistoryPoint {
  timestamp: number;
  value: number;
}

// Hook for real-time Mantle network data
export function useMantle(refreshInterval: number = 3000) {
  const [blocks, setBlocks] = useState<MantleBlock[]>([]);
  const [stats, setStats] = useState<MantleStats>({
    blockNumber: 0,
    gasPrice: '0',
    baseFee: '0',
    tps: 0,
    peakTps: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track TPS history for peak calculation
  const [tpsHistory, setTpsHistory] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    try {
      // Fetch latest block number
      const blockNumber = await mantleClient.getBlockNumber();
      
      // Fetch gas price
      const gasPrice = await mantleClient.getGasPrice();
      
      // Fetch latest 3 blocks
      const blockPromises: Promise<BlockData | null>[] = [];
      for (let i = 0; i < 3; i++) {
        const num = blockNumber - BigInt(i);
        blockPromises.push(
          mantleClient.getBlock({ blockNumber: num, includeTransactions: false })
            .then(b => b as BlockData)
            .catch(() => null)
        );
      }
      
      const fetchedBlocks = await Promise.all(blockPromises);
      const validBlocks = fetchedBlocks.filter((b): b is BlockData => b !== null);
      
      // Format blocks for display
      const formattedBlocks: MantleBlock[] = validBlocks.map(block => ({
        number: Number(block.number),
        hash: block.hash,
        timestamp: Number(block.timestamp),
        txCount: Array.isArray(block.transactions) ? block.transactions.length : 0,
        gasUsed: (Number(block.gasUsed) / 1e9).toFixed(2),
      }));

      setBlocks(formattedBlocks);

      // Calculate TPS from latest block (Mantle ~2s block time)
      const latestBlock = validBlocks[0];
      const txCount = latestBlock ? 
        (Array.isArray(latestBlock.transactions) ? latestBlock.transactions.length : 0) : 0;
      const currentTps = Math.round(txCount / 2); // ~2 second blocks

      // Update TPS history and calculate peak
      setTpsHistory(prev => {
        const newHistory = [...prev, currentTps].slice(-100); // Keep last 100 readings
        return newHistory;
      });

      const peakTps = Math.max(...tpsHistory, currentTps);

      // Get base fee from latest block
      const baseFee = latestBlock?.baseFeePerGas 
        ? formatGwei(latestBlock.baseFeePerGas) 
        : '0';

      setStats({
        blockNumber: Number(blockNumber),
        gasPrice: formatGwei(gasPrice),
        baseFee,
        tps: currentTps,
        peakTps,
      });

      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching Mantle data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setIsLoading(false);
    }
  }, [tpsHistory]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Polling interval
  useEffect(() => {
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    blocks,
    stats,
    isLoading,
    error,
    refetch: fetchData,
  };
}

// Hook for just block number (lightweight)
export function useBlockNumber(refreshInterval: number = 2000) {
  const [blockNumber, setBlockNumber] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const num = await mantleClient.getBlockNumber();
        setBlockNumber(Number(num));
      } catch (err) {
        console.error('Error fetching block number:', err);
      }
    };

    fetch();
    const interval = setInterval(fetch, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return blockNumber;
}

// Hook for gas price only
export function useGasPrice(refreshInterval: number = 5000) {
  const [gasPrice, setGasPrice] = useState<string>('0');

  useEffect(() => {
    const fetch = async () => {
      try {
        const price = await mantleClient.getGasPrice();
        setGasPrice(formatGwei(price));
      } catch (err) {
        console.error('Error fetching gas price:', err);
      }
    };

    fetch();
    const interval = setInterval(fetch, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return gasPrice;
}

// Hook for recent transactions
export function useTransactions(refreshInterval: number = 5000) {
  const [transactions, setTransactions] = useState<MantleTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      const txs = await getLatestTransactions(10);
      
      const formatted: MantleTransaction[] = txs.map(tx => {
        // Determine transaction type
        let type: 'transfer' | 'contract' | 'deploy' = 'transfer';
        if (!tx.to) {
          type = 'deploy';
        } else if (tx.input && tx.input !== '0x') {
          type = 'contract';
        }
        
        return {
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: formatEther(tx.value),
          timestamp: tx.timestamp || Math.floor(Date.now() / 1000),
          type,
        };
      });
      
      setTransactions(formatted);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchTransactions, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchTransactions, refreshInterval]);

  return { transactions, isLoading, error, refetch: fetchTransactions };
}

// Hook for TPS history (for charts)
export function useTPSHistory(maxPoints: number = 30) {
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const lastBlockRef = useRef<number>(0);

  useEffect(() => {
    const fetchTPS = async () => {
      try {
        const block = await mantleClient.getBlock({ includeTransactions: false });
        const blockNum = Number(block.number);
        
        // Only add new point if block changed
        if (blockNum !== lastBlockRef.current) {
          lastBlockRef.current = blockNum;
          const txCount = Array.isArray(block.transactions) ? block.transactions.length : 0;
          const tps = Math.round(txCount / 2); // ~2 second blocks
          
          setHistory(prev => {
            const newPoint = { timestamp: Date.now(), value: tps };
            return [...prev, newPoint].slice(-maxPoints);
          });
        }
      } catch (err) {
        console.error('Error fetching TPS:', err);
      }
    };

    fetchTPS();
    const interval = setInterval(fetchTPS, 2000);
    return () => clearInterval(interval);
  }, [maxPoints]);

  return history;
}

// Hook for Gas Price history (for charts)
export function useGasPriceHistory(maxPoints: number = 30) {
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    const fetchGas = async () => {
      try {
        const gasPrice = await mantleClient.getGasPrice();
        const gweiValue = Number(formatGwei(gasPrice));
        
        setHistory(prev => {
          const newPoint = { timestamp: Date.now(), value: gweiValue };
          return [...prev, newPoint].slice(-maxPoints);
        });
      } catch (err) {
        console.error('Error fetching gas price:', err);
      }
    };

    fetchGas();
    const interval = setInterval(fetchGas, 5000);
    return () => clearInterval(interval);
  }, [maxPoints]);

  return history;
}

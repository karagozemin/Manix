"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import StarField from "../components/StarField";
import { 
  Shield, Server, Activity, Clock, Blocks, 
  Fuel, TrendingUp, Globe, Zap, ExternalLink,
  CheckCircle2, Database, Layers
} from "lucide-react";
import { useMantle, useRealBlockTime, useBlockHistory } from "@/hooks/useMantle";
import { useMantleTVL } from "@/hooks/useDefiLlama";
import { formatTVL } from "@/lib/defillama";

function StatBox({ 
  icon: Icon, 
  label, 
  value, 
  unit,
  color = "#FFD15C" 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  unit?: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-xl p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color }} />
        <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-mono font-bold text-white">
        {value}
        {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
      </div>
    </motion.div>
  );
}

function SequencerInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-panel rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFD15C] to-[#FFA726] flex items-center justify-center">
          <Server className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Mantle Sequencer</h3>
          <p className="text-sm text-gray-400">Centralized Sequencer (L2)</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs font-medium text-green-400">Online</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-white/5">
          <div className="text-[10px] text-gray-500 uppercase mb-1">Operated By</div>
          <div className="text-sm font-medium text-white">Mantle Network</div>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <div className="text-[10px] text-gray-500 uppercase mb-1">Type</div>
          <div className="text-sm font-medium text-white">Optimistic Rollup</div>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <div className="text-[10px] text-gray-500 uppercase mb-1">Data Availability</div>
          <div className="text-sm font-medium text-[#FFD15C]">EigenDA</div>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <div className="text-[10px] text-gray-500 uppercase mb-1">Settlement</div>
          <div className="text-sm font-medium text-white">Ethereum L1</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <a 
          href="https://docs.mantle.xyz/network/introduction/a-]gentle-introduction" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#FFD15C] hover:underline"
        >
          Learn more about Mantle Architecture
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

function NetworkFeatures({ gasPrice, blockTime }: { gasPrice: string; blockTime: number }) {
  const formatBlockTime = (ms: number) => {
    if (ms >= 1000) return `~${(ms / 1000).toFixed(1)}s blocks`;
    return `~${ms}ms blocks`;
  };

  const features = [
    { icon: Zap, title: "Low Gas Fees", desc: `${parseFloat(gasPrice).toFixed(4)} Gwei` },
    { icon: Clock, title: "Fast Finality", desc: formatBlockTime(blockTime) },
    { icon: Shield, title: "Ethereum Security", desc: "Inherits L1 security" },
    { icon: Database, title: "EigenDA", desc: "Modular DA layer" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-panel rounded-xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-[#FFD15C]" />
        Network Features
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="p-2 rounded-lg bg-[#FFD15C]/10">
              <feature.icon className="w-4 h-4 text-[#FFD15C]" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">{feature.title}</div>
              <div className="text-xs text-gray-500">{feature.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function RecentActivity() {
  const { history } = useBlockHistory(10);
  const totalTxs = history.reduce((sum, b) => sum + b.txCount, 0);
  const avgTxs = history.length > 0 ? Math.round(totalTxs / history.length) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-panel rounded-xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-[#FFA726]" />
        Recent Activity (Last 10 Blocks)
      </h3>

      <div className="flex items-end gap-1 h-20 mb-4">
        {history.map((block, i) => {
          const maxTx = Math.max(...history.map(b => b.txCount), 1);
          const height = Math.max(10, (block.txCount / maxTx) * 100);
          return (
            <motion.div
              key={block.blockNumber}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.05 }}
              className="flex-1 bg-gradient-to-t from-[#FFA726] to-[#FFD15C] rounded-t cursor-pointer hover:opacity-80"
              title={`Block #${block.blockNumber}: ${block.txCount} txs`}
              onClick={() => window.open(`https://explorer.mantle.xyz/block/${block.blockNumber}`, '_blank')}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-mono font-bold text-white">{totalTxs}</div>
          <div className="text-xs text-gray-500">Total Txs</div>
        </div>
        <div>
          <div className="text-2xl font-mono font-bold text-[#FFD15C]">{avgTxs}</div>
          <div className="text-xs text-gray-500">Avg/Block</div>
        </div>
        <div>
          <div className="text-2xl font-mono font-bold text-[#FFA726]">{history.length}</div>
          <div className="text-xs text-gray-500">Blocks</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ValidatorsPage() {
  const { stats, isLoading } = useMantle(5000);
  const { blockTime, isCalculating } = useRealBlockTime();
  const { tvlData } = useMantleTVL();

  const formatBlockTime = (ms: number) => {
    if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
    return `${ms}ms`;
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white selection:bg-[#FFD15C]/30 overflow-hidden">
      <StarField />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        {/* Content */}
        <div className="flex-1 pt-24 pb-8 px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Page Title */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#FFD15C]" />
                Network & Sequencer
              </h1>
              <p className="text-gray-400">
                Mantle is an L2 with a centralized sequencer. Here&apos;s the network status and metrics.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatBox 
                icon={Blocks} 
                label="Latest Block" 
                value={isLoading ? "..." : `#${stats.blockNumber.toLocaleString()}`}
              />
              <StatBox 
                icon={Clock} 
                label="Block Time" 
                value={isCalculating ? "..." : formatBlockTime(blockTime)}
                color="#FFA726"
              />
              <StatBox 
                icon={Fuel} 
                label="Gas Price" 
                value={isLoading ? "..." : parseFloat(stats.gasPrice).toFixed(4)}
                unit="Gwei"
              />
              <StatBox 
                icon={TrendingUp} 
                label="TVL" 
                value={tvlData ? formatTVL(tvlData.tvl) : "..."}
                color="#FFA726"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <SequencerInfo />
              <NetworkFeatures gasPrice={stats.gasPrice} blockTime={blockTime} />
              <RecentActivity />
              
              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-panel rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#FFD15C]" />
                  Network Info
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Chain ID</span>
                    <span className="font-mono font-bold">5000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Native Token</span>
                    <span className="font-mono font-bold text-[#FFD15C]">MNT</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Network Type</span>
                    <span className="font-mono">Optimistic Rollup</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Parent Chain</span>
                    <span className="font-mono">Ethereum</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Status</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Operational
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex gap-3">
                  <a 
                    href="https://explorer.mantle.xyz" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-lg bg-[#FFD15C]/10 text-[#FFD15C] text-center text-sm font-medium hover:bg-[#FFD15C]/20 transition-colors"
                  >
                    Explorer
                  </a>
                  <a 
                    href="https://bridge.mantle.xyz" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-lg bg-[#FFA726]/10 text-[#FFA726] text-center text-sm font-medium hover:bg-[#FFA726]/20 transition-colors"
                  >
                    Bridge
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

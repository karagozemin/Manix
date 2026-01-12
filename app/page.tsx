"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import StarField from "./components/StarField";
import Particles from "./components/Particles";
import { Clock, TrendingUp, Database, Activity, Shield, Lock } from "lucide-react";

const Globe = dynamic(() => import("./components/Globe"), { ssr: false });

interface Block {
  number: number;
  validator: string;
  txs: number;
  round: number;
}

// Validator names pool
const VALIDATORS = [
  "Node3Tech", "BlackBlocks", "FHECore", "CryptoNode", "ValidatorX",
  "StakePool", "SecureNet", "ChainGuard", "BlockForge", "NodeMaster",
  "FHE_Labs", "PrivacyNode", "TrustNet", "CipherStake", "ZKValidator"
];

const LOCATIONS = [
  "Falkenstein", "Frankfurt", "Amsterdam", "Singapore", "Tokyo",
  "New York", "London", "Paris", "Sydney", "Toronto"
];

// Pre-generated opacity values to avoid hydration mismatch
const proposalOpacities = [
  0.85, 0.72, 0.91, 0.68, 0.78, 0.95, 0.73, 0.88, 0.67, 0.82,
  0.76, 0.93, 0.71, 0.89, 0.75, 0.84, 0.69, 0.92, 0.77, 0.86,
  0.74, 0.90, 0.70, 0.87, 0.79, 0.94, 0.72, 0.83, 0.68, 0.91,
  0.76, 0.88, 0.73, 0.85, 0.80, 0.93, 0.71, 0.89, 0.77, 0.86,
  0.74, 0.92, 0.65, 0.70, 0.68
];

function ProposalHistory() {
  return (
    <div className="glass-panel rounded-xl p-3 col-span-2 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Proposal History</h3>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD15C] animate-pulse"></span>
          <span className="text-[10px] text-[#FFD15C] font-bold">Live</span>
        </div>
      </div>
      <div className="flex gap-0.5 h-6 w-full mb-1">
        {proposalOpacities.map((opacity, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-[1px] ${i < 42 ? 'bg-[#FFD15C]' : 'bg-red-500/50'}`}
            style={{ opacity }} 
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-2">
        <span>Latest Proposed and Timeouts</span>
        <div className="flex gap-3">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#FFD15C] rounded-full"></span>Finalized</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Timeout</span>
        </div>
      </div>
    </div>
  );
}

function RecentBlockRow({ block, index }: { block: Block; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-[#FFD15C]/10 rounded-lg">
          <Lock className="w-3.5 h-3.5 text-[#FFD15C]" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white font-mono">#{block.number.toLocaleString('en-US')}</span>
          <span className="text-[10px] text-gray-400">{block.validator}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px] text-gray-500 font-mono uppercase">Round {block.round.toLocaleString('en-US')}</div>
        <div className="text-xs font-mono text-[#FFA726]">{block.txs} txs</div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  // Dynamic TPS
  const [tps, setTps] = useState(20);
  
  // Dynamic epoch validator
  const [epochValidator, setEpochValidator] = useState({ name: "Node3Tech", location: "Falkenstein" });
  
  // Dynamic blocks
  const [blocks, setBlocks] = useState<Block[]>([
    { number: 48026683, validator: "Node3Tech", txs: 9, round: 48139643 },
    { number: 48026682, validator: "BlackBlocks", txs: 10, round: 48139642 },
    { number: 48026681, validator: "FHECore", txs: 7, round: 48139641 },
  ]);
  
  // Slowly change TPS
  useEffect(() => {
    const interval = setInterval(() => {
      setTps(prev => {
        const change = Math.random() * 6 - 3; // -3 to +3
        const newTps = Math.round(prev + change);
        return Math.max(5, Math.min(50, newTps)); // Keep between 5-50
      });
    }, 2000); // Every 2 seconds
    return () => clearInterval(interval);
  }, []);
  
  // Change epoch validator periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValidator = VALIDATORS[Math.floor(Math.random() * VALIDATORS.length)];
      const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      setEpochValidator({ name: randomValidator, location: randomLocation });
    }, 8000); // Every 8 seconds
    return () => clearInterval(interval);
  }, []);
  
  // Add new blocks continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const lastBlock = prev[0];
        const newBlock: Block = {
          number: lastBlock.number + 1,
          validator: VALIDATORS[Math.floor(Math.random() * VALIDATORS.length)],
          txs: Math.floor(Math.random() * 15) + 3,
          round: lastBlock.round + 1
        };
        return [newBlock, ...prev].slice(0, 3); // Keep last 3 blocks
      });
      
    }, 3000); // New block every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white selection:bg-[#FFD15C]/30 overflow-hidden">
      
      {/* 1. LAYER: Background Starfield */}
      {/* 1. LAYER: Background Starfield */}
      <StarField />
      
      {/* 2. LAYER: Particles Effect - Bright star particles */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Particles
          particleColors={['#ffffff', '#ffffff', '#ffffcc']}
          particleCount={400}
          particleSpread={25}
          speed={0.1}
          particleBaseSize={150}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
          cameraDistance={18}
          sizeRandomness={1.5}
        />
      </div>
      
      {/* 3. LAYER: Globe (Behind UI) - Centered */}
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <div className="w-full h-full -translate-y-30">
          <Globe />
        </div>
      </div>

      {/* 3. LAYER: UI Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
        
        {/* Spacer for Globe visibility - push dashboard down */}
        <div className="flex-1 min-h-[55vh]"></div>

        {/* Floating Info Pills */}
        <div className="container mx-auto px-6 mb-3 flex items-center justify-between pointer-events-none">
           <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="pointer-events-auto glass-panel rounded-full px-5 py-2 flex items-center gap-3 border border-[#FFD15C]/20 bg-black/40 backdrop-blur-xl"
          >
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Epoch</span>
              <span className="text-lg font-mono font-bold text-white">#961</span>
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFD15C] to-[#FFA726] flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-black" />
              </div>
              <motion.div 
                key={epochValidator.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className="text-[11px] font-bold">{epochValidator.name}</span>
                <span className="text-[9px] text-gray-400">{epochValidator.location}</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="pointer-events-auto glass-panel rounded-full px-5 py-2 flex items-center gap-4 border border-white/5 bg-black/40 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-gray-500 uppercase">Validators</span>
              <span className="text-xs font-bold font-mono">171</span>
            </div>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-gray-500 uppercase">Countries</span>
              <span className="text-xs font-bold font-mono">27</span>
            </div>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-gray-500 uppercase">Cities</span>
              <span className="text-xs font-bold font-mono">53</span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <div className="container mx-auto px-6 pb-4 pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <ProposalHistory />
            
            <div className="glass-panel rounded-xl p-3 col-span-2 h-[190px]">
               <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Blocks</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD15C] animate-pulse"></span>
                  <span className="text-[10px] text-[#FFD15C] font-bold">Live</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                {blocks.map((b, i) => <RecentBlockRow key={b.number} block={b} index={i} />)}
              </div>
            </div>

            <StatsCard title="TPS" value={tps.toString()} unit="Live (5s)" icon={<Activity />} sparkline />
            <StatsCard title="Peak TPS" value="88" unit="7d" icon={<TrendingUp />} />
            
            <div className="glass-panel rounded-xl p-3 col-span-2 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] text-gray-500 uppercase mb-1 flex justify-between">
                  <span>Median Fee</span>
                  <span>1m</span>
                </div>
                <div className="text-xl font-mono font-bold">0.0329 <span className="text-xs text-gray-500 font-sans">FHE</span></div>
                <div className="h-1 w-full bg-[#FFD15C]/20 mt-2 rounded-full overflow-hidden">
                   <div className="h-full bg-[#FFD15C] w-[40%]" />
                </div>
              </div>
              <div className="border-l border-white/10 pl-4">
                <div className="text-[10px] text-gray-500 uppercase mb-1 flex justify-between">
                  <span>Gas Price</span>
                  <span>1m</span>
                </div>
                <div className="text-xl font-mono font-bold text-[#FFA726]">102 <span className="text-xs text-gray-500 font-sans">Gwei</span></div>
                 <div className="h-1 w-full bg-[#FFA726]/20 mt-2 rounded-full overflow-hidden">
                   <div className="h-full bg-[#FFA726] w-[65%]" />
                </div>
              </div>
            </div>

            <StatsCard title="Block Time" value="403" unit="ms" icon={<Clock />} />
            <StatsCard title="Encrypted Txs" value="1,247" unit="%" icon={<Lock />} />
            <StatsCard title="Total Staked" value="14,951" unit="FHE" icon={<Database />} />
            <div className="glass-panel rounded-xl p-3 flex flex-col justify-center items-center">
               <span className="text-[10px] text-gray-500 uppercase mb-1">APY</span>
               <span className="text-lg font-bold text-[#FFD15C]">+7.38M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

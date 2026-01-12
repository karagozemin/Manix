# 🏗️ Manix Architecture

> Technical documentation for the Manix Mantle Network Explorer

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [High-Level Architecture](#high-level-architecture)
3. [Data Flow](#data-flow)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [API Layer](#api-layer)
7. [Real-Time Updates](#real-time-updates)
8. [3D Visualization](#3d-visualization)
9. [Performance Optimizations](#performance-optimizations)
10. [Security Considerations](#security-considerations)

---

## 🌐 System Overview

Manix is a **client-side rendered** (CSR) application built with Next.js App Router. It fetches data directly from:

1. **Mantle RPC** (`https://rpc.mantle.xyz`) - Blockchain data
2. **DefiLlama API** (`https://api.llama.fi`) - DeFi metrics

```
┌─────────────────────────────────────────────────────────────────┐
│                         MANIX CLIENT                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Next.js App Router                    │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │   Page.tsx  │  │  Hooks      │  │  Components     │  │   │
│  │  │  (Dashboard)│  │  useMantle  │  │  Globe, Charts  │  │   │
│  │  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘  │   │
│  │         │                │                   │           │   │
│  │         └────────────────┼───────────────────┘           │   │
│  │                          │                               │   │
│  │                   ┌──────▼──────┐                        │   │
│  │                   │  lib/       │                        │   │
│  │                   │  mantle.ts  │                        │   │
│  │                   │  defillama  │                        │   │
│  │                   └──────┬──────┘                        │   │
│  └──────────────────────────┼───────────────────────────────┘   │
│                             │                                    │
└─────────────────────────────┼────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
   │  Mantle RPC  │   │  DefiLlama   │   │  localStorage │
   │  (viem)      │   │  REST API    │   │  (Peak TPS)   │
   └──────────────┘   └──────────────┘   └──────────────┘
```

---

## 🏛️ High-Level Architecture

### Technology Stack Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  React Components + Framer Motion + Tailwind CSS         │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐│   │
│  │  │ Header  │ │ Stats   │ │ Charts  │ │ 3D Globe        ││   │
│  │  │         │ │ Cards   │ │ Live    │ │ (R3F + Three.js)││   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────────┘│   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      APPLICATION LAYER                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Custom React Hooks (State + Side Effects)               │   │
│  │  ┌─────────────┐ ┌───────────────┐ ┌─────────────────┐  │   │
│  │  │ useMantle   │ │ useDefiLlama  │ │ usePersistent   │  │   │
│  │  │ useBlocks   │ │ useMantleTVL  │ │ PeakTPS         │  │   │
│  │  │ useTPS      │ │ useProtocols  │ │                 │  │   │
│  │  └─────────────┘ └───────────────┘ └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      DATA ACCESS LAYER                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  API Clients & Utilities                                 │   │
│  │  ┌─────────────────────┐ ┌─────────────────────────────┐│   │
│  │  │ lib/mantle.ts       │ │ lib/defillama.ts            ││   │
│  │  │ - mantleClient      │ │ - getMantleTVL()            ││   │
│  │  │ - getLatestBlocks() │ │ - getMantleProtocols()      ││   │
│  │  │ - getGasPrice()     │ │ - getMantleTVLHistory()     ││   │
│  │  │ - formatMNT()       │ │ - formatTVL()               ││   │
│  │  └─────────────────────┘ └─────────────────────────────┘│   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      EXTERNAL SERVICES                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Mantle RPC      │  │  DefiLlama API   │  │  Browser     │  │
│  │  rpc.mantle.xyz  │  │  api.llama.fi    │  │  localStorage│  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Block & Transaction Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                         DATA FLOW DIAGRAM                          │
└────────────────────────────────────────────────────────────────────┘

  Mantle RPC                    React Hooks                  Components
      │                              │                            │
      │   eth_blockNumber            │                            │
      │ ◄────────────────────────────┤                            │
      │                              │                            │
      │   blockNumber: 90065542      │                            │
      ├─────────────────────────────►│                            │
      │                              │                            │
      │   eth_getBlockByNumber       │                            │
      │   (last 4 blocks)            │                            │
      │ ◄────────────────────────────┤                            │
      │                              │                            │
      │   blocks: Block[]            │                            │
      ├─────────────────────────────►│                            │
      │                              │   Calculate TPS            │
      │                              │   txCount / blockTime      │
      │                              ├───────────────────────────►│
      │                              │                            │
      │                              │   Update UI                │
      │                              │   RecentBlocks             │
      │                              │   StatsCards               │
      │                              │   Charts                   │
      │                              │ ◄──────────────────────────┤
      │                              │                            │

  ┌─────────────────────────────────────────────────────────────────┐
  │  POLLING CYCLE: Every 3000ms                                    │
  │  1. Fetch latest block number                                   │
  │  2. Fetch last 4 blocks with transactions                       │
  │  3. Calculate TPS from transaction counts                       │
  │  4. Fetch gas price                                             │
  │  5. Update all subscribed components                            │
  └─────────────────────────────────────────────────────────────────┘
```

### TPS Calculation Algorithm

```typescript
// hooks/useMantle.ts

function calculateTPS(blocks: Block[]): number {
  if (blocks.length < 2) return 0;
  
  // Get time span between first and last block
  const timeSpan = blocks[0].timestamp - blocks[blocks.length - 1].timestamp;
  
  // Sum all transactions
  const totalTxs = blocks.reduce((sum, block) => 
    sum + block.transactions.length, 0
  );
  
  // TPS = Total Transactions / Time Span (in seconds)
  return Math.round(totalTxs / timeSpan);
}
```

---

## 🧩 Component Architecture

### Component Hierarchy

```
App (layout.tsx)
└── Home (page.tsx)
    ├── Header
    │   └── ConnectionStatus
    ├── StarField (background)
    ├── Particles (WebGL background)
    ├── Globe (3D visualization)
    │   ├── Earth mesh
    │   ├── Atmosphere shader
    │   ├── GlowingMarkers[]
    │   └── TransactionArcs[]
    ├── InfoPills (Block #, Chain ID, Status)
    └── Dashboard Grid
        ├── BlockHistoryChart
        ├── RecentBlocks
        │   └── RecentBlockRow[]
        ├── RecentTransactions
        │   └── TransactionRow[]
        ├── TPSChart (LiveChart)
        ├── GasPriceChart (LiveChart)
        ├── StatsCard (TPS)
        ├── StatsCard (Peak TPS)
        ├── GasInfoPanel
        ├── TVLPanel
        │   └── ProtocolRow[]
        └── NetworkStatsGrid
            ├── BlockTime
            ├── LatestBlock
            ├── GasToken
            └── Layer
```

### Component Communication

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT DATA FLOW                          │
└─────────────────────────────────────────────────────────────────┘

                          ┌──────────────┐
                          │   page.tsx   │
                          │   (Parent)   │
                          └──────┬───────┘
                                 │
            ┌────────────────────┼────────────────────┐
            │                    │                    │
            ▼                    ▼                    ▼
    ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
    │  useMantle()  │   │ useRealBlock  │   │ usePersistent │
    │               │   │ Time()        │   │ PeakTPS()     │
    └───────┬───────┘   └───────┬───────┘   └───────┬───────┘
            │                   │                   │
            │    blocks, stats  │    blockTime      │    peakTps
            │                   │                   │
            └───────────────────┼───────────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
            ┌───────────┐ ┌─────────┐ ┌─────────────┐
            │ StatsCard │ │ Charts  │ │ RecentBlocks│
            │  (props)  │ │ (props) │ │   (props)   │
            └───────────┘ └─────────┘ └─────────────┘
```

---

## 🗃️ State Management

### State Architecture

Manix uses **React hooks** for state management without external libraries like Redux.

```
┌─────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                           │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  HOOK-BASED STATE                                                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  useMantle()                                                ││
│  │  ├── blocks: MantleBlock[]          (Server State)          ││
│  │  ├── stats: NetworkStats            (Derived State)         ││
│  │  ├── isLoading: boolean             (UI State)              ││
│  │  └── error: string | null           (Error State)           ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  useTPSHistory()                                            ││
│  │  └── history: HistoryPoint[]        (Time-Series State)     ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  usePersistentPeakTPS()                                     ││
│  │  ├── peakTps: number                (Persistent State)      ││
│  │  └── peakTimestamp: number          (localStorage)          ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  useMantleTVL()                                             ││
│  │  └── tvlData: TVLData               (External API State)    ││
│  └─────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

### State Update Cycle

```typescript
// Simplified state update flow

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    
    try {
      // 1. Fetch latest blocks
      const blocks = await getLatestBlocks(4);
      
      // 2. Calculate derived state
      const tps = calculateTPS(blocks);
      const gasPrice = await getGasPrice();
      
      // 3. Update state
      setBlocks(blocks);
      setStats({ tps, gasPrice, ... });
      
      // 4. Update history (append new point)
      setTpsHistory(prev => [...prev.slice(-29), { timestamp: Date.now(), value: tps }]);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  fetchData();
  
  // Set up polling interval
  const interval = setInterval(fetchData, pollInterval);
  
  return () => clearInterval(interval);
}, [pollInterval]);
```

---

## 🔌 API Layer

### Mantle RPC Client

```typescript
// lib/mantle.ts

import { createPublicClient, http } from 'viem';
import { mantle } from 'viem/chains';

export const mantleClient = createPublicClient({
  chain: mantle,
  transport: http('https://rpc.mantle.xyz'),
});

// Available Methods
export async function getBlockNumber(): Promise<bigint>
export async function getBlock(blockNumber: bigint): Promise<Block>
export async function getLatestBlocks(count: number): Promise<MantleBlock[]>
export async function getGasPrice(): Promise<bigint>
export async function getTransaction(hash: string): Promise<Transaction>
export async function getLatestTransactions(count: number): Promise<MantleTransaction[]>
```

### DefiLlama API Client

```typescript
// lib/defillama.ts

const DEFILLAMA_BASE = 'https://api.llama.fi';

export interface TVLData {
  tvl: number;
  change24h: number;
  protocols: number;
  rank: number;
}

// Available Methods
export async function getMantleTVL(): Promise<TVLData | null>
export async function getMantleProtocols(limit?: number): Promise<ProtocolData[]>
export async function getMantleTVLHistory(): Promise<HistoryPoint[]>
```

### API Response Types

```typescript
// Types for Mantle RPC responses

interface MantleBlock {
  number: number;
  hash: string;
  timestamp: number;
  txCount: number;
  gasUsed: string;
  baseFeePerGas: string;
}

interface MantleTransaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  timestamp: number;
  type: 'transfer' | 'contract' | 'deploy';
}

interface NetworkStats {
  blockNumber: number;
  tps: number;
  peakTps: number;
  gasPrice: string;
  baseFee: string;
}
```

---

## ⚡ Real-Time Updates

### Polling Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    POLLING INTERVALS                            │
└─────────────────────────────────────────────────────────────────┘

  Data Type              Interval      Reason
  ─────────────────────────────────────────────────────────────────
  Blocks & TPS           3000ms        ~2s Mantle block time
  Transactions           5000ms        Less critical, reduce load
  Gas Price              3000ms        Included with blocks
  TVL Data               60000ms       Changes slowly
  Connection Status      5000ms        Health check
  ─────────────────────────────────────────────────────────────────

  ┌─────────────────────────────────────────────────────────────┐
  │  TIME (seconds)                                             │
  │  0    1    2    3    4    5    6    7    8    9    10       │
  │  │    │    │    │    │    │    │    │    │    │    │        │
  │  ●────────●────────●────────●────────●  Blocks (3s)        │
  │  ●───────────────●───────────────●      Transactions (5s)  │
  │  ●─────────────────────────────────────────────────────●    │
  │                                           TVL (60s)         │
  └─────────────────────────────────────────────────────────────┘
```

### Connection Status Detection

```typescript
// hooks/useMantleWebSocket.ts

export function useConnectionStatus() {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    const checkConnection = async () => {
      const start = Date.now();
      try {
        await mantleClient.getBlockNumber();
        setLatency(Date.now() - start);
        setStatus('connected');
      } catch {
        setStatus('disconnected');
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  return { status, latency };
}
```

---

## 🌍 3D Visualization

### Globe Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    GLOBE COMPONENT STRUCTURE                    │
└─────────────────────────────────────────────────────────────────┘

  Globe.tsx
  │
  ├── Canvas (React Three Fiber)
  │   │
  │   ├── PerspectiveCamera
  │   │   └── position: [0, 0, 2.5]
  │   │
  │   ├── OrbitControls
  │   │   ├── autoRotate: true
  │   │   ├── autoRotateSpeed: 0.3
  │   │   └── enableZoom: false
  │   │
  │   ├── Lighting
  │   │   ├── ambientLight (intensity: 0.15)
  │   │   ├── directionalLight (Mantle teal)
  │   │   └── pointLight (secondary green)
  │   │
  │   ├── Earth (main mesh)
  │   │   ├── geometry: SphereGeometry(1, 64, 64)
  │   │   └── material: MeshStandardMaterial + texture
  │   │
  │   ├── Atmosphere (glow effect)
  │   │   ├── geometry: SphereGeometry(1.15)
  │   │   └── material: Custom ShaderMaterial
  │   │
  │   ├── GlowingMarkers[] (node points)
  │   │   └── Randomly positioned on sphere surface
  │   │
  │   └── TransactionArcs[] (animated arcs)
  │       ├── QuadraticBezierLine
  │       └── useFrame animation loop
  │
  └── Suspense fallback (Loading state)
```

### Atmosphere Shader

```glsl
// Vertex Shader
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment Shader
varying vec3 vNormal;
void main() {
  float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
  gl_FragColor = vec4(0.0, 0.85, 0.65, 1.0) * intensity * 0.9;  // Mantle teal
}
```

### Transaction Arc Animation

```typescript
function TransactionArc({ start, end, color, speed }) {
  const ref = useRef<Line2>();
  const progressRef = useRef(Math.random() * 0.3);

  useFrame((_, delta) => {
    progressRef.current += delta * speed;
    if (progressRef.current > 1) {
      progressRef.current = 0;
      // Reset to new random endpoints
    }
    // Update line opacity based on progress
  });

  return (
    <QuadraticBezierLine
      ref={ref}
      start={start}
      end={end}
      mid={calculateMidpoint(start, end)}
      color={color}
      lineWidth={2}
    />
  );
}
```

---

## ⚙️ Performance Optimizations

### Implemented Optimizations

```
┌─────────────────────────────────────────────────────────────────┐
│                  PERFORMANCE OPTIMIZATIONS                      │
└─────────────────────────────────────────────────────────────────┘

  1. DYNAMIC IMPORTS
     ─────────────────────────────────────────────────────────────
     const Globe = dynamic(() => import('./Globe'), { ssr: false });
     
     - 3D Globe loaded only on client side
     - Reduces initial bundle size
     - Prevents SSR hydration issues

  2. MEMOIZATION
     ─────────────────────────────────────────────────────────────
     - useMemo for expensive calculations
     - useCallback for event handlers
     - Prevents unnecessary re-renders

  3. VIRTUALIZATION
     ─────────────────────────────────────────────────────────────
     - Limited recent blocks to 4 items
     - Limited transactions to 10 items
     - History charts capped at 30 points

  4. DEBOUNCED UPDATES
     ─────────────────────────────────────────────────────────────
     - TPS history updates batched
     - Chart animations use requestAnimationFrame
     - State updates consolidated

  5. LAZY LOADING
     ─────────────────────────────────────────────────────────────
     - Protocol logos loaded on-demand
     - External link icons deferred
     - Non-critical UI elements delayed

  6. CSS OPTIMIZATIONS
     ─────────────────────────────────────────────────────────────
     - backdrop-filter for glassmorphism
     - will-change hints for animations
     - GPU-accelerated transforms
```

### Bundle Analysis

```
Page                                Size     First Load JS
─────────────────────────────────────────────────────────────
○ /                                 45 kB    180 kB
  └── components/Globe              85 kB    (dynamic import)
  └── three.js                      150 kB   (tree-shaken)
```

---

## 🔒 Security Considerations

### API Security

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY MEASURES                            │
└─────────────────────────────────────────────────────────────────┘

  1. READ-ONLY OPERATIONS
     - No private keys stored
     - No wallet connections (yet)
     - All RPC calls are read-only

  2. CORS HANDLING
     - DefiLlama API is public
     - Mantle RPC allows cross-origin

  3. INPUT VALIDATION
     - Block numbers validated
     - Transaction hashes checked
     - Address formats verified

  4. ERROR BOUNDARIES
     - API failures gracefully handled
     - Fallback UI for errors
     - No sensitive data in logs

  5. RATE LIMITING
     - Reasonable polling intervals
     - No aggressive requests
     - Respects API limits
```

---

## 📊 Monitoring & Debugging

### Console Logging (Development)

```typescript
// Enable debug mode
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('[Mantle] Block fetched:', blockNumber);
  console.log('[Mantle] TPS calculated:', tps);
  console.log('[DefiLlama] TVL updated:', tvl);
}
```

### Performance Metrics

```typescript
// Measure API latency
const start = performance.now();
const blocks = await getLatestBlocks(4);
const latency = performance.now() - start;
console.log(`[Perf] Blocks fetched in ${latency.toFixed(0)}ms`);
```

---

## 📝 Future Architecture Considerations

### Planned Improvements

1. **WebSocket Integration**
   - Subscribe to new blocks via WebSocket
   - Reduce polling overhead
   - True real-time updates

2. **Server-Side Caching**
   - Cache TVL data on edge
   - Reduce DefiLlama API calls
   - Faster initial load

3. **State Management**
   - Consider Zustand for complex state
   - Add React Query for caching
   - Implement optimistic updates

4. **Testing Architecture**
   - Unit tests for hooks
   - Integration tests for API
   - E2E tests with Playwright

---

<p align="center">
  <sub>Architecture Document - Manix v1.0</sub>
</p>

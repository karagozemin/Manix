<p align="center">
  <img src="public/GzSli3caYAAQ5UK.jpeg" alt="Manix Logo" width="180" style="border-radius: 50%;" />
</p>

<h1 align="center">🦉 Manix</h1>

<p align="center">
  <strong>Real-Time Mantle Network Explorer & Visualizer</strong>
</p>

<p align="center">
  <a href="https://mantle.xyz">
    <img src="https://img.shields.io/badge/Network-Mantle%20L2-00D9A5?style=for-the-badge&logo=ethereum" alt="Mantle Network" />
  </a>
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge" alt="MIT License" />
  </a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-live-demo">Demo</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌟 Overview

**Manix** is a sophisticated, real-time blockchain explorer and network visualizer for the **Mantle Network** - Ethereum's high-performance Layer 2 scaling solution. Built with modern web technologies, Manix provides an immersive experience for monitoring network activity through an interactive 3D globe, live transaction streams, and comprehensive analytics.

> **All data is 100% real** - fetched directly from Mantle RPC and DefiLlama APIs. No mock data.

---

## ✨ Features

### 🌍 Interactive 3D Globe Visualization
- **Real-time network nodes** displayed across the globe
- **Animated transaction arcs** flowing between nodes with Mantle teal/green colors
- **360° orbit controls** with smooth rotation
- **Atmospheric glow** effect with depth perception
- Built with **React Three Fiber** and **Three.js**

### 📊 Real-Time Dashboard

| Metric | Source | Update Interval |
|--------|--------|-----------------|
| **TPS (Transactions Per Second)** | Mantle RPC | 3 seconds |
| **Peak TPS** | localStorage + Live | Persistent |
| **Block Time** | Calculated from last 10 blocks | 3 seconds |
| **Gas Price** | `eth_gasPrice` RPC | 3 seconds |
| **Base Fee** | Block header data | 3 seconds |
| **TVL** | DefiLlama API | 60 seconds |
| **Chain Rank** | DefiLlama API | 60 seconds |

### 📦 Live Data Streams

- **Recent Blocks** - Live block feed with transaction counts
- **Recent Transactions** - Real-time transaction stream with type detection
- **TPS History Chart** - Rolling 30-point TPS graph
- **Gas History Chart** - Rolling 30-point gas price graph
- **Block History Chart** - Transaction count visualization for last 45 blocks

### 💰 DeFi Analytics

- **Total Value Locked (TVL)** from DefiLlama
- **24h TVL Change** percentage
- **Protocol Count** on Mantle
- **Chain Rank** among all blockchains
- **Top 5 Protocols** with TVL and 24h change

### 🎨 Visual Design

- **Mantle-inspired theme**: Teal (#00D9A5), Blue (#3B82F6), Purple (#8B5CF6)
- **Glassmorphism** UI components with backdrop blur
- **Framer Motion** animations throughout
- **Particle starfield** background
- **Responsive design** for all screen sizes

---

## 🔗 Data Sources

| Data | Source | Method |
|------|--------|--------|
| Blocks & Transactions | Mantle RPC | `viem` client |
| Gas Prices | Mantle RPC | `eth_gasPrice` |
| TVL & Protocols | DefiLlama | REST API |
| Connection Status | WebSocket health check | Polling |

### Mantle Network Details

```
Chain ID:     5000
RPC URL:      https://rpc.mantle.xyz
Native Token: MNT
Explorer:     https://explorer.mantle.xyz
Type:         Optimistic Rollup → ZK Validity L2
DA Layer:     EigenDA
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0+ or **yarn** 1.22+

### Installation

```bash
# Clone the repository
git clone https://github.com/karagozemin/Manix.git

# Navigate to project directory
cd Manix

# Install dependencies
npm install

# Start development server
npm run dev
```

### Open in Browser

```
http://localhost:3000
```

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm run start
```

---

## 📁 Project Structure

```
Manix/
├── app/
│   ├── components/
│   │   ├── Globe.tsx              # 3D Earth with nodes & transaction arcs
│   │   ├── Header.tsx             # Navigation with connection status
│   │   ├── BlockHistoryChart.tsx  # 45-block tx count visualization
│   │   ├── LiveChart.tsx          # TPS & Gas price charts
│   │   ├── RecentTransactions.tsx # Live transaction feed
│   │   ├── TVLPanel.tsx           # DeFi metrics from DefiLlama
│   │   ├── ConnectionStatus.tsx   # RPC connection indicator
│   │   ├── StatsCard.tsx          # Reusable stat display
│   │   ├── Particles.tsx          # WebGL particle system
│   │   ├── StarField.tsx          # CSS star background
│   │   └── Sparkline.tsx          # Mini chart component
│   ├── globals.css                # Theme & glassmorphism styles
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Main dashboard
├── hooks/
│   ├── useMantle.ts               # Core Mantle data hooks
│   ├── useDefiLlama.ts            # TVL & protocol hooks
│   └── useMantleWebSocket.ts      # Connection status hook
├── lib/
│   ├── mantle.ts                  # Mantle RPC client & utilities
│   └── defillama.ts               # DefiLlama API client
├── public/
│   ├── GzSli3caYAAQ5UK.jpeg       # Manix logo
│   └── mantle-logo.png            # Mantle logo
├── ARCHITECTURE.md                # System architecture docs
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.x | React framework with App Router |
| **React** | 19.x | UI component library |
| **TypeScript** | 5.x | Type-safe development |

### Styling & Animation
| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Declarative animations |
| **CSS Variables** | Theme customization |

### 3D Graphics
| Technology | Purpose |
|------------|---------|
| **Three.js** | WebGL 3D rendering |
| **React Three Fiber** | React renderer for Three.js |
| **@react-three/drei** | Useful helpers & abstractions |

### Blockchain
| Technology | Purpose |
|------------|---------|
| **viem** | Type-safe Ethereum client |
| **Mantle RPC** | Direct blockchain queries |

### Data Sources
| Technology | Purpose |
|------------|---------|
| **DefiLlama API** | TVL & DeFi protocol data |
| **localStorage** | Persistent peak TPS storage |

---

## 📚 API Reference

### Custom Hooks

#### `useMantle(pollInterval?: number)`
Main hook for fetching Mantle network data.

```typescript
const { blocks, stats, isLoading, error } = useMantle(3000);

// Returns:
// blocks: MantleBlock[] - Latest 4 blocks
// stats: { tps, peakTps, blockNumber, gasPrice, baseFee }
// isLoading: boolean
// error: string | null
```

#### `useRealBlockTime()`
Calculates average block time from recent blocks.

```typescript
const { blockTime, isCalculating } = useRealBlockTime();

// blockTime: number (milliseconds)
```

#### `useTransactions(pollInterval?: number)`
Fetches recent transactions with type detection.

```typescript
const { transactions, isLoading, error } = useTransactions(5000);

// transactions: MantleTransaction[]
// type: 'transfer' | 'contract' | 'deploy'
```

#### `useTPSHistory(maxPoints?: number)`
Tracks TPS over time for charts.

```typescript
const history = useTPSHistory(30);

// history: { timestamp: number, value: number }[]
```

#### `useMantleTVL()`
Fetches TVL data from DefiLlama.

```typescript
const { tvlData, isLoading } = useMantleTVL();

// tvlData: { tvl, change24h, protocols, rank }
```

#### `usePersistentPeakTPS()`
Stores peak TPS in localStorage.

```typescript
const { peakTps, peakTimestamp, updatePeak } = usePersistentPeakTPS();
```

---

## 🎨 Theme Configuration

### Color Palette

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Mantle Teal | `#00D9A5` | `--accent-teal` | Primary accent |
| Electric Blue | `#3B82F6` | `--accent-blue` | Secondary accent |
| Purple | `#8B5CF6` | `--accent-purple` | Tertiary accent |
| Deep Space | `#0a0a12` | `--deep-space` | Background |
| Glass | `rgba(10,15,20,0.6)` | `--card-bg` | Panel backgrounds |

### Customization

Edit `app/globals.css` to customize the theme:

```css
:root {
  --accent-teal: #00D9A5;
  --accent-blue: #3B82F6;
  --accent-purple: #8B5CF6;
  --deep-space: #0a0a12;
}
```

---

## 🗺️ Roadmap

### ✅ Phase 1 - Foundation (Complete)
- [x] Interactive 3D globe with transaction arcs
- [x] Real-time block & transaction feeds
- [x] Live TPS, gas price, block time metrics
- [x] DefiLlama TVL integration
- [x] Responsive glassmorphism design
- [x] Mantle-themed color scheme

### 🚧 Phase 2 - Enhanced Analytics (In Progress)
- [ ] Historical TPS/Gas charts (24h, 7d, 30d)
- [ ] Transaction detail pages
- [ ] Address lookup functionality
- [ ] Block detail pages
- [ ] Token transfers tracking

### 📋 Phase 3 - Advanced Features
- [ ] Wallet connection (Connect to view your txs)
- [ ] Gas price predictions
- [ ] Network alerts & notifications
- [ ] Comparison with other L2s
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Use **TypeScript** for all new code
- Follow existing **code style** and patterns
- Write **meaningful commit messages**
- Update **documentation** for new features
- Add **types** for all new interfaces

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Mantle Network](https://mantle.xyz) - High-performance Ethereum L2
- [DefiLlama](https://defillama.com) - DeFi TVL data
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D rendering
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [viem](https://viem.sh) - Ethereum client
- [Tailwind CSS](https://tailwindcss.com) - Styling

---

## 📞 Contact

- **GitHub**: [@karagozemin](https://github.com/karagozemin)
- **Project**: [Manix Repository](https://github.com/karagozemin/Manix)

---

<p align="center">
  <img src="public/mantle-logo.png" alt="Mantle" width="32" />
</p>

<p align="center">
  <strong>Built with 💚 for the Mantle Ecosystem</strong>
</p>

<p align="center">
  <sub>Manix © 2026 | Real-time Mantle Network Explorer</sub>
</p>

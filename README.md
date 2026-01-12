<p align="center">
  <img src="public/mantle-logo.png" alt="Manix Logo" width="200" />
</p>

<h1 align="center">Manix</h1>

<p align="center">
  <strong>Mantle Network Explorer</strong><br/>
  Real-time visualization of the Mantle Network
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#roadmap">Roadmap</a>
</p>

---

## 🌟 About

**Manix** is an elegant network visualizer and explorer for the Mantle Network - a high-performance Ethereum L2 built with modular architecture. Experience real-time network activity through an interactive 3D globe, live transaction flows, and comprehensive network statistics.

---

## ✨ Features

### 🌍 Interactive 3D Globe
- Real-time visualization of network nodes across the globe
- Animated transaction arcs flowing between nodes
- Smooth rotation and full 360° orbit controls
- Golden atmosphere glow effect

### 📊 Live Dashboard
- **TPS (Transactions Per Second)** - Live network throughput
- **Peak TPS** - Historical maximum performance
- **Block Time** - Average block confirmation time
- **Total Txs** - Transaction count
- **Total Staked** - Network stake amount (MNT)
- **Gas Price** - Current network fees

### 📦 Recent Blocks
- Live block feed with real-time data from Mantle
- Transaction count per block
- Block numbers and details
- Animated block entry transitions

### 🏛️ Network Information
- Current block height
- Active validators/sequencers display
- Network health metrics

### ✨ Visual Effects
- Particle star field background
- Glassmorphism UI components
- Smooth Framer Motion animations
- Black & Gold theme

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **React Three Fiber** | 3D globe rendering |
| **Three.js** | WebGL graphics |
| **Framer Motion** | Smooth animations |
| **viem** | Ethereum/Mantle RPC interactions |
| **Lucide Icons** | Beautiful icons |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
Manix/
├── app/
│   ├── components/
│   │   ├── Globe.tsx          # 3D Earth with nodes & arcs
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Particles.tsx      # Star particle background
│   │   ├── StarField.tsx      # CSS star background
│   │   ├── StatsCard.tsx      # Statistics display cards
│   │   └── ...
│   ├── validators/
│   │   └── page.tsx           # Validators page
│   ├── globals.css            # Global styles & theme
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main dashboard
├── lib/
│   └── mantle.ts              # Mantle RPC client & helpers
├── public/
│   └── mantle-logo.png        # Manix logo
├── package.json
└── README.md
```

---

## 🎨 Theme

Manix uses a sophisticated **Black & Gold** color scheme:

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Space | `#0a0a12` | Background |
| Gold Primary | `#FFD15C` | Accents, highlights |
| Gold Secondary | `#FFA726` | Secondary accents |
| White | `#FFFFFF` | Text, particles |

---

## 🗺️ Roadmap

### Phase 1 - Foundation ✅
- [x] Interactive 3D globe visualization
- [x] Animated transaction arcs
- [x] Dashboard with statistics
- [x] Recent blocks feed
- [x] Particle effects background
- [x] Responsive design

### Phase 2 - Live Data 🚧
- [ ] Real Mantle Network RPC integration
- [ ] Live block & transaction data
- [ ] Real-time gas prices
- [ ] Actual TPS metrics

### Phase 3 - Advanced Features
- [ ] Historical data & charts
- [ ] Transaction detail pages
- [ ] Block explorer functionality
- [ ] Search functionality
- [ ] Mobile optimization

---

## 🔗 Mantle Network

- **Chain ID:** 5000
- **RPC URL:** https://rpc.mantle.xyz
- **Native Token:** MNT
- **Explorer:** https://explorer.mantle.xyz

---

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

## 🙏 Acknowledgments

- [Mantle Network](https://mantle.xyz) - For the high-performance L2
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D rendering
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [viem](https://viem.sh) - Ethereum interactions

---

<p align="center">
  Built with 💛 for the Mantle ecosystem
</p>

---

<p align="center">
  <em>Manix Edition - 2026</em>
</p>

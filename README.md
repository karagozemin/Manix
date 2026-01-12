<p align="center">
  <img src="public/zama-logo.jpg" alt="Fhelix Logo" width="200" />
</p>

<h1 align="center">Fhelix</h1>

<p align="center">
  <strong>Zama Network Explorer</strong><br/>
  Real-time visualization of the Zama FHE Network
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

**Fhelix** is an elegant network visualizer and explorer for the Zama Network - the world's first Fully Homomorphic Encryption (FHE) blockchain. Experience real-time network activity through an interactive 3D globe, live transaction flows, and comprehensive network statistics.

> ⚠️ **Note:** Currently running with mock data for demonstration purposes. Once Zama Chain is fully operational, Fhelix will transition to displaying real validators, live transactions, and actual network metrics.

---

## ✨ Features

### 🌍 Interactive 3D Globe
- Real-time visualization of validator nodes across the globe
- Animated transaction arcs flowing between validators
- Smooth rotation and full 360° orbit controls
- Golden atmosphere glow effect

### 📊 Live Dashboard
- **TPS (Transactions Per Second)** - Live network throughput
- **Peak TPS** - Historical maximum performance
- **Block Time** - Average block confirmation time
- **Encrypted Txs** - FHE transaction count
- **Total Staked** - Network stake amount
- **Gas Price** - Current network fees
- **Median Fee** - Transaction fee statistics

### 📦 Recent Blocks
- Live block feed with validator attribution
- Transaction count per block
- Round numbers and block details
- Animated block entry transitions

### 🏛️ Epoch Information
- Current epoch number
- Active validator display
- Validator location data

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
| **OGL** | Particle effects |
| **Lucide Icons** | Beautiful icons |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fhelix.git

# Navigate to project directory
cd fhelix/zama-visualizer

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
zama-visualizer/
├── app/
│   ├── components/
│   │   ├── Globe.tsx          # 3D Earth with validators & arcs
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Particles.tsx      # Star particle background
│   │   ├── StarField.tsx      # CSS star background
│   │   ├── StatsCard.tsx      # Statistics display cards
│   │   └── ...
│   ├── validators/
│   │   └── page.tsx           # Validators page (Coming Soon)
│   ├── globals.css            # Global styles & theme
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main dashboard
├── public/
│   └── zama-logo.jpg          # Fhelix logo
├── package.json
└── README.md
```

---

## 🎨 Theme

Fhelix uses a sophisticated **Black & Gold** color scheme:

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Space | `#0a0a12` | Background |
| Gold Primary | `#FFD15C` | Accents, highlights |
| Gold Secondary | `#FFA726` | Secondary accents |
| White | `#FFFFFF` | Text, particles |

---

## 🗺️ Roadmap

### Current (v1.0 - Mock Data)
- [x] Interactive 3D globe visualization
- [x] Animated transaction arcs
- [x] Live dashboard with mock statistics
- [x] Recent blocks feed
- [x] Epoch & validator display
- [x] Particle effects background
- [x] Validators page (Coming Soon)
- [x] Responsive design

### Future (v2.0 - Live Data)
- [ ] Real Zama Network API integration
- [ ] Live validator data from chain
- [ ] Actual transaction tracking
- [ ] Historical data & charts
- [ ] Validator detail pages
- [ ] Block explorer functionality
- [ ] Search functionality
- [ ] Mobile optimization

---

## 🔮 Vision

Once **Zama Chain** launches and stabilizes, Fhelix will evolve into a full-featured network explorer with:

- **Real Validators**: Live validator nodes with actual stake amounts, uptime, and performance metrics
- **Live Transactions**: Real FHE transactions flowing across the globe
- **True Statistics**: Actual TPS, block times, gas prices, and network health metrics
- **Block Explorer**: Full block and transaction inspection capabilities

---

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

## 🙏 Acknowledgments

- [Zama](https://zama.ai) - For pioneering FHE technology
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D rendering
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com) - Styling

---

<p align="center">
  Built with 💛 for the Zama ecosystem
</p>

---

<p align="center">
  <em>Manix Edition - 2026</em>
</p>

"use client";

import { motion } from "framer-motion";
import { Home, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Validators", href: "/validators", icon: ShieldCheck },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-[#FFD15C]/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
              src="/mantle-logo.png" 
              alt="Manix Logo" 
              className="w-12 h-12 object-contain"
            />
              <div>
                <h1 className="text-xl font-bold text-white">Manix</h1>
                <p className="text-xs text-zinc-400">Mantle Network</p>
              </div>
            </motion.div>
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 group-hover:text-[#FFD15C] transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

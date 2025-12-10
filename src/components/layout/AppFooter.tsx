"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-900/50 py-4 mt-auto text-center text-sm text-red-400/80 shadow-[0_-10px_30px_-15px_rgba(255,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        {/* Brand */}
        <p className="tracking-widest uppercase font-semibold text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]">
          PILEM
        </p>
        <p className="px-2"> | </p>
        <p className="text-xs tracking-wide text-red-400/60">
          Presented by{" "}
          <span className="font-bold text-red-300/90">Raihan Marwanda</span> ©
          2025
        </p>
      </div>
    </footer>
  );
}

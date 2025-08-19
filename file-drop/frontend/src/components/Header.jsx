import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0B1220]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#06B6D4] shadow-[0_0_0_4px_rgba(124,58,237,0.15)]" />
          <span className="text-lg font-semibold tracking-tight text-slate-100">
            VaporPress
          </span>
        </div>

        {/* Tagline */}
        <div className="text-sm font-medium text-slate-400 hidden sm:block">
          Compress your Image with High Quality
        </div>

        {/* Action Button */}
        <button className="rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#06B6D4] px-3 py-1.5 text-sm font-medium text-white shadow-[0_6px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_8px_28px_rgba(6,182,212,0.4)] transition-shadow">
          Docs
        </button>
      </div>
    </header>
  );
};

export default Header;

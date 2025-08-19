import React from "react";

const Button = ({ name, btn_handler, className = "" }) => {
  return (
    <button
      onClick={btn_handler}
      className={`rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#06B6D4] px-4 py-2 text-sm font-medium text-white shadow-[0_4px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_28px_rgba(6,182,212,0.45)] transition-all duration-200 active:scale-95 ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;

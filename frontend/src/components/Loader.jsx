import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-14">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,53,48,0.08)]">
        <div className="absolute inset-0 rounded-full border border-[#e8e0d8]" />
        <div className="absolute h-10 w-10 rounded-full border-4 border-transparent border-t-[#7d9e8c] animate-spin" />
        <span className="relative text-xs uppercase tracking-[0.35em] text-[#a89b90]">Loading</span>
      </div>
    </div>
  )
}

export default Loader

import { useState } from 'react'
import { Leaf, Menu, X } from 'lucide-react'

const Navbar = ({ activeView, onViewChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navButton = (label, view) => (
    <button
      type="button"
      onClick={() => {
        onViewChange(view)
        setMobileOpen(false)
      }}
      className={`group inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition ${
        activeView === view
          ? 'border-[#7d9e8c] bg-[#f5f2ee] text-[#3d3530]'
          : 'border-transparent text-[#3d3530] hover:border-[#7d9e8c] hover:text-[#7d9e8c]'
      }`}
    >
      {label}
    </button>
  )

  return (
    <header className="rounded-[30px] border border-[#e8e0d8] bg-amber-200 px-5 py-5 shadow-[0_15px_40px_rgba(61,53,48,0.08)] sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5f2ee] text-[#7d9e8c] shadow-[0_8px_20px_rgba(125,158,140,0.12)]">
            <Leaf size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7d9e8c]">Driftwork</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[0.02em] text-[#2c2420]">
              A calm workspace for mindful focus 
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            {navButton('Dashboard', 'dashboard')}
            {navButton('Add Task', 'addTask')}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e8e0d8] bg-white text-[#3d3530] shadow-[0_10px_30px_rgba(61,53,48,0.08)] sm:hidden"
            aria-label="Open navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mt-4 flex flex-col gap-3 rounded-[28px] border border-[#e8e0d8] bg-white p-4 shadow-[0_10px_30px_rgba(61,53,48,0.08)] sm:hidden">
          {navButton('Dashboard', 'dashboard')}
          {navButton('Add Task', 'addTask')}
        </div>
      )}
    </header>
  )
}

export default Navbar

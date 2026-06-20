import React from 'react'
import { useTheme } from '../context/ThemeContext'

const Navbar = ({ activeView, onViewChange }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-100 dark:bg-slate-900 rounded-xl shadow-sm">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Task Manager</p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Organize your priorities</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onViewChange('dashboard')}
          className={`px-4 py-2 rounded-lg ${activeView === 'dashboard' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-100'}`}>
          Dashboard
        </button>
        <button
          type="button"
          onClick={() => onViewChange('addTask')}
          className={`px-4 py-2 rounded-lg ${activeView === 'addTask' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-100'}`}>
          Add Task
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  )
}

export default Navbar

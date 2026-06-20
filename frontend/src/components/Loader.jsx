import React from 'react'

// Loader shows a simple loading indicator while data is being fetched.
const Loader = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-700 dark:border-t-slate-200" />
    </div>
  )
}

export default Loader

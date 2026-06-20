import React from 'react'

// EmptyState displays a friendly message when there are no tasks to show.
const EmptyState = () => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center bg-slate-50 dark:bg-slate-900 dark:border-slate-700">
      <p className="text-slate-500 dark:text-slate-400">No tasks found yet.</p>
      <p className="mt-2 text-slate-700 dark:text-slate-200">Create your first task from the Add Task page.</p>
    </div>
  )
}

export default EmptyState

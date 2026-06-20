const EmptyState = ({ filter = 'All' }) => {
  const message =
    filter === 'All'
      ? 'No tasks found yet.'
      : `No ${filter.toLowerCase()} tasks found.`

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center bg-slate-50 dark:bg-slate-900 dark:border-slate-700">
      <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{message}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {filter === 'All'
          ? 'Create your first task from the Add Task page.'
          : 'Try a different filter or create a new task.'}
      </p>
    </div>
  )
}

export default EmptyState

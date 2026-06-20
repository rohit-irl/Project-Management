const STATUS_STYLES = {
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const TaskCard = ({ task, onComplete, onDelete }) => {
  const isCompleted = task.status === 'Completed'

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">{task.title}</h2>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{task.description}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[task.status] || STATUS_STYLES.Pending}`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Created: {formatDate(task.createdAt)}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        {!isCompleted && (
          <button
            type="button"
            onClick={() => onComplete(task._id)}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            Complete Task
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-50 dark:text-red-400 dark:ring-red-900 dark:hover:bg-red-950"
        >
          Delete Task
        </button>
      </div>
    </article>
  )
}

export default TaskCard

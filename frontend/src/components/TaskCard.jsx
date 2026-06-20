const STATUS_BADGES = {
  Pending:
    'border border-[#c9a0a0]/30 bg-[#f9edea] text-[#c9a0a0]',
  'In Progress':
    'border border-[#7d9e8c]/30 bg-[#edf3ef] text-[#7d9e8c] animate-zen-pulse',
  Completed:
    'border border-[#e8e0d8]/30 bg-[#f5f2ee] text-[#a89b90]',
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
    <article className="group relative overflow-hidden rounded-[32px] border border-[#e8e0d8] bg-amber-200 p-6 shadow-[0_12px_28px_rgba(61,53,48,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(61,53,48,0.1)]">
      <span className="absolute left-0 top-5 bottom-5 w-1.5 rounded-full bg-[#7d9e8c]" />
      <div className="relative flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className={`text-xl font-semibold ${isCompleted ? 'line-through text-amber-950' : 'text-[#2c2420]'}`}>
              {task.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-amber-950 line-clamp-2">
              {task.description}
            </p>
          </div>
          
          <span className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${STATUS_BADGES[task.status] || STATUS_BADGES.Pending}`}>
            {task.status === 'Completed' ? '✓ Completed' : task.status}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-950">
            Created {formatDate(task.createdAt)}
          </p>
          <div className="flex flex-wrap gap-3">
            {!isCompleted && (
              <button
                type="button"
                onClick={() => onComplete(task._id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e0d8] bg-white text-amber-950 transition hover:bg-[#edf3ef] active:scale-95"
                aria-label="Mark complete"
              >
                ✅
              </button>
            )}
            <button
              type="button"
              onClick={() => onDelete(task._id)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e0d8] bg-white text-amber-950 transition hover:bg-[#f7eceb] active:scale-95"
              aria-label="Delete task"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TaskCard

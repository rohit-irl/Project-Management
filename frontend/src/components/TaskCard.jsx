import React from 'react'

// TaskCard displays a single task item with actions for completion and deletion.
const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  return (
    <article className="border rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-slate-100">{task.title}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{task.description}</p>
        </div>
        <button
          type="button"
          onClick={() => onToggleComplete(task._id)}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${task.completed ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-400">{task.dueDate || 'No due date'}</span>
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-800 dark:text-red-400">
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard

import { useState } from 'react'

const STATUS_OPTIONS = ['Pending', 'In Progress']

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Pending')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const nextErrors = {}

    if (!title.trim()) {
      nextErrors.title = 'Title is required'
    }

    if (!description.trim()) {
      nextErrors.description = 'Description is required'
    } else if (description.trim().length < 20) {
      nextErrors.description = 'Description must be at least 20 characters'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    if (!validate()) return

    setSubmitting(true)
    try {
      await onAddTask({ title: title.trim(), description: description.trim(), status })
      setTitle('')
      setDescription('')
      setStatus('Pending')
      setErrors({})
    } catch (err) {
      const apiErrors = err.response?.data?.errors
      if (apiErrors?.length) {
        setSubmitError(apiErrors.join('. '))
      } else {
        setSubmitError('Failed to create task. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8"
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Create New Task</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add a task with a clear title and detailed description.
        </p>
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 ${
            errors.title
              ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
              : 'border-slate-300 focus:border-slate-500 focus:ring-slate-200 dark:border-slate-700'
          }`}
          placeholder="Enter a task title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`mt-2 w-full min-h-[120px] rounded-2xl border bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 ${
            errors.description
              ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
              : 'border-slate-300 focus:border-slate-500 focus:ring-slate-200 dark:border-slate-700'
          }`}
          placeholder="Add details for this task (minimum 20 characters)"
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.description ? (
            <p className="text-sm text-red-600">{errors.description}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-slate-400">{description.trim().length} / 20 min</span>
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 sm:w-auto"
      >
        {submitting ? 'Creating...' : 'Add Task'}
      </button>
    </form>
  )
}

export default AddTask

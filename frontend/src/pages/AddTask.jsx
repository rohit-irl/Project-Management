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

  const descriptionLength = description.trim().length
  const counterColor = descriptionLength < 20 ? 'text-[#c9a0a0]' : 'text-[#7d9e8c]'

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-8 rounded-[32px] border border-[#e8e0d8] bg-amber-200 p-10 shadow-[0_15px_40px_rgba(61,53,48,0.08)]"
    >
      <div className="space-y-3 border-t-4 border-[#7d9e8c] pt-6">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-950">Add Task</p>
        <h2 className="text-3xl font-semibold tracking-[0.02em] text-amber-950">
          Create your next focus item
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-amber-950">
          Write clear tasks in a calm environment with soft borders and generous spacing.
        </p>
      </div>

      {submitError && (
        <div className="rounded-3xl border border-[#e8e0d8] bg-white px-4 py-3 text-sm text-[#3d3530] shadow-[0_15px_30px_rgba(61,53,48,0.08)]">
          {submitError}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a89b90]">
          Task Title <span className="text-[#c9a0a0]">*</span>
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full rounded-3xl border px-5 py-4 bg-[#faf7f4] text-[#3d3530] outline-none transition focus:border-[#7d9e8c] focus:ring-2 focus:ring-[#7d9e8c]/20 ${
            errors.title ? 'border-[#c9a0a0]' : 'border-[#e8e0d8]'
          }`}
          placeholder="Enter a task title"
        />
        {errors.title && <p className="text-sm text-[#c9a0a0]">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a89b90]">
          Description <span className="text-[#c9a0a0]">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full min-h-[150px] rounded-3xl border px-5 py-4 bg-[#faf7f4] text-amber-950 outline-none transition focus:border-[#7d9e8c] focus:ring-2 focus:ring-[#7d9e8c]/20 ${
            errors.description ? 'border-[#c9a0a0]' : 'border-[#e8e0d8]'
          }`}
          placeholder="Add details for this task (minimum 20 characters)"
        />
        <div className="flex items-center justify-between text-sm">
          {errors.description ? (
            <p className="text-amber-950">{errors.description}</p>
          ) : (
            <span className={`text-amber-950 ${counterColor}`}>{descriptionLength} / 20 min</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-950">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-3xl border border-[#e8e0d8] bg-[#faf7f4] px-5 py-4 text-amber-950 outline-none transition focus:border-[#7d9e8c] focus:ring-2 focus:ring-[#7d9e8c]/20"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-white text-amber-950">
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#7d9e8c] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_15px_40px_rgba(125,158,140,0.18)] transition hover:bg-[#6b8f7a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Saving Task...' : 'Add Task'}
      </button>
    </form>
  )
}

export default AddTask

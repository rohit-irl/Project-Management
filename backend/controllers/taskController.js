import Task, { STATUS_OPTIONS } from '../models/Task.js'

const formatValidationError = (error) => {
  if (error.name === 'ValidationError') {
    return Object.values(error.errors).map((err) => err.message)
  }
  return [error.message]
}

export const getTasks = async (req, res) => {
  try {
    const filter = {}
    if (req.query.status && STATUS_OPTIONS.includes(req.query.status)) {
      filter.status = req.query.status
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch tasks', errors: [error.message] })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Validation failed', errors: ['Title is required'] })
    }

    if (!description?.trim() || description.trim().length < 20) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: ['Description must be at least 20 characters'],
      })
    }

    if (status && !STATUS_OPTIONS.includes(status)) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [`Status must be one of: ${STATUS_OPTIONS.join(', ')}`],
      })
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status: status || 'Pending',
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ message: 'Invalid task data', errors: formatValidationError(error) })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ message: 'Validation failed', errors: ['Status is required'] })
    }

    if (!STATUS_OPTIONS.includes(status)) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [`Status must be one of: ${STATUS_OPTIONS.join(', ')}`],
      })
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!task) {
      return res.status(404).json({ message: 'Task not found', errors: ['Task not found'] })
    }

    res.json(task)
  } catch (error) {
    res.status(400).json({ message: 'Unable to update task', errors: formatValidationError(error) })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found', errors: ['Task not found'] })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete task', errors: [error.message] })
  }
}

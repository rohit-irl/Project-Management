import mongoose from 'mongoose'

// Task.js defines the Task schema for MongoDB using Mongoose.
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)
export default Task

import mongoose from 'mongoose'

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed']

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [20, 'Description must be at least 20 characters'],
      trim: true,
    },
    status: {
      type: String,
      enum: STATUS_OPTIONS,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id
        ret.created_at = ret.createdAt
        delete ret.__v
        return ret
      },
    },
  }
)

const Task = mongoose.model('Task', taskSchema)
export { STATUS_OPTIONS }
export default Task

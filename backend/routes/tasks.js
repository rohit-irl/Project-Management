import express from 'express'
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js'

// tasks.js declares RESTful routes for task operations.
const router = express.Router()

router.get('/', getTasks)
router.post('/', createTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router

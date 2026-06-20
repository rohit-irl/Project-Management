import axios from 'axios'

// api.js configures the Axios client and exports helper methods for backend calls.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchTasks = () => api.get('/tasks')
export const addTask = (taskData) => api.post('/tasks', taskData)
export const updateTask = (taskId, patchData) => api.patch(`/tasks/${taskId}`, patchData)
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`)

export default api

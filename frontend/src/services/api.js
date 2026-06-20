import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchTasks = (status) => {
  const params = status && status !== 'All' ? { status } : {}
  return api.get('/tasks', { params })
}

export const addTask = (taskData) => api.post('/tasks', taskData)
export const updateTask = (taskId, patchData) => api.put(`/tasks/${taskId}`, patchData)
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`)

export default api

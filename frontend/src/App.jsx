import { useCallback, useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddTask from './pages/AddTask'
import { addTask, deleteTask, fetchTasks, updateTask } from './services/api'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeView, setActiveView] = useState('dashboard')
  const [statusFilter, setStatusFilter] = useState('All')

  const loadTasks = useCallback(async (filter = statusFilter) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetchTasks(filter)
      setTasks(response.data)
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend server is running.')
      console.error('Failed to fetch tasks:', err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const handleFilterChange = (filter) => {
    setStatusFilter(filter)
    loadTasks(filter)
  }

  const handleAddTask = async (taskData) => {
    const response = await addTask(taskData)
    setTasks((current) => [response.data, ...current])
    setActiveView('dashboard')
  }

  const handleCompleteTask = async (taskId) => {
    const response = await updateTask(taskId, { status: 'Completed' })
    setTasks((current) => current.map((item) => (item._id === taskId ? response.data : item)))
  }

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId)
    setTasks((current) => current.filter((item) => item._id !== taskId))
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <Navbar activeView={activeView} onViewChange={setActiveView} />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
              {error}
            </div>
          )}

          {activeView === 'dashboard' ? (
            <Dashboard
              tasks={tasks}
              loading={loading}
              statusFilter={statusFilter}
              onFilterChange={handleFilterChange}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ) : (
            <AddTask onAddTask={handleAddTask} />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

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
  const [toastMessage, setToastMessage] = useState('')

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

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(''), 3200)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const handleFilterChange = (filter) => {
    setStatusFilter(filter)
    loadTasks(filter)
  }

  const handleAddTask = async (taskData) => {
    const response = await addTask(taskData)
    setTasks((current) => [response.data, ...current])
    setActiveView('dashboard')
    setToastMessage('Task created successfully.')
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
      <div className="min-h-screen bg-[#faf7f4] text-[#3d3530] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <Navbar activeView={activeView} onViewChange={setActiveView} />

          {toastMessage && (
            <div className="fixed right-5 top-5 z-50 w-full max-w-xs rounded-3xl border-l-4 border-[#7d9e8c] bg-white p-4 text-sm text-[#3d3530] shadow-[0_18px_50px_rgba(61,53,48,0.12)] animate-toast-show">
              <p className="font-semibold">{toastMessage}</p>
            </div>
          )}

          {error && (
            <div className="rounded-3xl border border-[#e8e0d8] bg-white px-4 py-3 text-sm text-[#3d3530] shadow-[0_18px_50px_rgba(61,53,48,0.08)]">
              {error}
            </div>
          )}

          <main className="space-y-6 animate-fadeIn">
            {activeView === 'dashboard' ? (
              <Dashboard
                tasks={tasks}
                loading={loading}
                statusFilter={statusFilter}
                onFilterChange={handleFilterChange}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
                onViewChange={setActiveView}
              />
            ) : (
              <AddTask onAddTask={handleAddTask} />
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

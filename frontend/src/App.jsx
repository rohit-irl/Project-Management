
import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddTask from './pages/AddTask'
import {  addTask, updateTask, deleteTask } from './services/api'

// App is the root React component that routes between dashboard and add task views.
const App = () => {
  const [tasks, setTasks] = useState([])
  const [loading] = useState(true)
  const [activeView, setActiveView] = useState('dashboard')


  const handleAddTask = async (taskData) => {
    try {
      const response = await addTask(taskData)
      setTasks((current) => [response.data, ...current])
      setActiveView('dashboard')
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find((item) => item._id === taskId)
      if (!task) return
      const response = await updateTask(taskId, { completed: !task.completed })
      setTasks((current) => current.map((item) => (item._id === taskId ? response.data : item)))
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      setTasks((current) => current.filter((item) => item._id !== taskId))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <Navbar activeView={activeView} onViewChange={setActiveView} />
          {activeView === 'dashboard' ? (
            <Dashboard tasks={tasks} loading={loading} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} />
          ) : (
            <AddTask onAddTask={handleAddTask} />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

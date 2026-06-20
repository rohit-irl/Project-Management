import React from 'react'
import TaskCard from '../components/TaskCard'
import EmptyState from '../components/EmptyState'

// Dashboard shows the list of tasks and render state for loading or empty lists.
const Dashboard = ({ tasks, loading, onToggleComplete, onDelete }) => {
  if (loading) {
    return <p className="text-center p-10">Loading tasks...</p>
  }

  if (!tasks?.length) {
    return <EmptyState />
  }

  return (
    <section className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
      ))}
    </section>
  )
}

export default Dashboard

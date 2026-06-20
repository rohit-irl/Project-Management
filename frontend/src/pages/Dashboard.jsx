import TaskCard from '../components/TaskCard'
import EmptyState from '../components/EmptyState'
import Loader from '../components/Loader'

const FILTER_OPTIONS = ['All', 'Pending', 'In Progress', 'Completed']

const Dashboard = ({ tasks, loading, statusFilter, onFilterChange, onComplete, onDelete, onViewChange }) => {
  const total = tasks.length
  const pending = tasks.filter((task) => task.status === 'Pending').length
  const inProgress = tasks.filter((task) => task.status === 'In Progress').length
  const completed = tasks.filter((task) => task.status === 'Completed').length

  const stats = [
    { label: 'Total', value: total, icon: '🗂' },
    { label: 'Pending', value: pending, icon: '⏳' },
    { label: 'In Progress', value: inProgress, icon: '🔄' },
    { label: 'Completed', value: completed, icon: '✅' },
  ]

  return (
    <section className="space-y-8 animate-fadeIn">
      <div className="space-y-6 rounded-[32px] border border-[#e8e0d8] bg-amber-200 p-8  sm:p-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-950">Dashboard</p>
          <h1 className="text-5xl font-semibold leading-tight tracking-[0.01em] text-amber-950">
            A quiet place for every task
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-amber-950">
            Organized thoughts. Clear priorities. Peaceful progress.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[28px] border border-[#e8e0d8] bg-rose-400 p-5 shadow-[0_8px_20px_rgba(61,53,48,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#f5f2ee] text-xl text-amber-950">
                  {item.icon}
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-amber-950">{item.label}</span>
              </div>
              <p className="mt-6 text-3xl font-semibold text-amber-950">
                <span className="text-amber-950">{item.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onFilterChange(option)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition ${
              statusFilter === option
                ? 'border-[#7d9e8c] bg-[#edf3ef] text-[#3d3530]'
                : 'border-[#e8e0d8] bg-white text-[#a89b90] hover:border-[#7d9e8c] hover:text-[#3d3530]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : !tasks?.length ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onComplete={onComplete} onDelete={onDelete} />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => onViewChange('addTask')}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#7d9e8c] text-xl text-white shadow-[0_18px_50px_rgba(125,158,140,0.18)] transition hover:bg-[#6b8f7a] sm:hidden"
        aria-label="Add Task"
      >
        +
      </button>
    </section>
  )
}

export default Dashboard

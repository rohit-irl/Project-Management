import TaskCard from '../components/TaskCard'
import EmptyState from '../components/EmptyState'
import Loader from '../components/Loader'

const FILTER_OPTIONS = ['All', 'Pending', 'In Progress', 'Completed']

const Dashboard = ({ tasks, loading, statusFilter, onFilterChange, onComplete, onDelete }) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">All Tasks</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onFilterChange(option)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === option
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : !tasks?.length ? (
        <EmptyState filter={statusFilter} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Dashboard

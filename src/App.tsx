import { useState } from 'react';
import './styles/App.css';
import { useTasks } from './hooks/useTask';
import { useMediaQuery } from './hooks/useMediaQuery';
import { useNotification } from './hooks/useNotification';
import type { Task, TaskStatus } from './types';
import { Plus, Search, ChevronLeft, Sun, Moon } from 'lucide-react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DoodleIllustration from './components/DoodleIllustration';
import Notification from './components/Notification';
import { useTheme } from './hooks/useTheme';

type ViewState = 'LIST' | 'ADD' | 'EDIT';

function App() {
  const { tasks, searchQuery, setSearchQuery, statusFilter, setStatusFilter, addTask, updateTask, deleteTask } = useTasks();
  const [view, setView] = useState<ViewState>('LIST');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const isDesktop = useMediaQuery('(min-width: 1028px)');
  const { theme, toggleTheme } = useTheme();
  const { notification, fading, showNotification } = useNotification();

  // On desktop, LIST view doesn't make sense alone -- show ADD instead
  const effectiveView = (isDesktop && view === 'LIST') ? 'ADD' : view;

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setView('EDIT');
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    showNotification('Task deleted', 'error');
    if (editingTask?.id === id) {
      setEditingTask(null);
      setView(isDesktop ? 'ADD' : 'LIST');
    }
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    updateTask(id, { status });
    showNotification('Task status updated', 'info');
  };

  const handleAddSubmit = (title: string, description: string) => {
    addTask(title, description);
    showNotification('Task created successfully', 'success');
    if (!isDesktop) {
      setView('LIST');
    }
  };

  const handleEditSubmit = (title: string, description: string, status?: TaskStatus) => {
    if (editingTask) {
      updateTask(editingTask.id, { title, description, ...(status && { status }) });
      showNotification('Task updated successfully', 'success');
      setEditingTask(null);
      setView(isDesktop ? 'ADD' : 'LIST');
    }
  };

  const handleEditCancel = () => {
    setEditingTask(null);
    setView(isDesktop ? 'ADD' : 'LIST');
  };

  return (
    <div className="app-container">
      <div className={`responsive-wrapper ${isDesktop ? 'desktop-grid' : ''}`}>

        {/* LEFT COLUMN: TASK LIST */}
        {(isDesktop || effectiveView === 'LIST') && (
          <section className="panel list-panel">
            <header className="app-header">
              <h1 className="header-title">Task Management</h1>
              <button
                className="icon-btn theme-toggle"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} color="white" /> : <Sun size={20} color="white" />}
              </button>
            </header>

            <div className="panel-body">
              <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search To-Do"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="status-filters">
                {(['All', 'Pending', 'In Progress', 'Completed'] as const).map((status) => (
                  <button
                    key={status}
                    className={`filter-chip${statusFilter === status ? ' filter-chip-active' : ''}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <TaskList
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </div>

            {!isDesktop && (
              <button onClick={() => setView('ADD')} className="fab">
                <Plus size={32} color="white" />
              </button>
            )}
          </section>
        )}

        {/* RIGHT COLUMN: FORM + DOODLE */}
        {(isDesktop || effectiveView !== 'LIST') && (
          <div className="right-column">
            <section className="panel form-panel">
              <header className="app-header form-header">
                <div className="header-content">
                  {!isDesktop && (
                    <button onClick={() => { setEditingTask(null); setView('LIST'); }} className="icon-btn back-btn">
                      <ChevronLeft size={28} color="white" />
                    </button>
                  )}
                  <h1 className="header-title">
                    {effectiveView === 'EDIT' ? 'Edit Task' : 'Add Task'}
                  </h1>
                </div>
              </header>

              <div className="panel-body">
                {effectiveView === 'EDIT' && editingTask ? (
                  <TaskForm
                    mode="edit"
                    task={editingTask}
                    onSubmit={handleEditSubmit}
                    onCancel={handleEditCancel}
                  />
                ) : (
                  <TaskForm
                    mode="add"
                    onSubmit={handleAddSubmit}
                  />
                )}
              </div>
            </section>

            <DoodleIllustration />
          </div>
        )}

      </div>

      <Notification notification={notification} fading={fading} />
    </div>
  );
}

export default App;

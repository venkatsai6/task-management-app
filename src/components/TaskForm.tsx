import { useState, useEffect } from 'react';
import type { Task, TaskStatus } from '../types';
import StatusPicker from './StatusPicker';

interface TaskFormProps {
  mode: 'add' | 'edit';
  task?: Task | null;
  onSubmit: (title: string, description: string, status?: TaskStatus) => void;
  onCancel?: () => void;
}

function TaskForm({ mode, task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Pending');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('Pending');
    }
    setError('');
  }, [mode, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required.');
      return;
    }

    if (mode === 'edit') {
      onSubmit(trimmedTitle, description.trim(), status);
    } else {
      onSubmit(trimmedTitle, description.trim());
    }

    if (mode === 'add') {
      setTitle('');
      setDescription('');
      setStatus('Pending');
    }
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Task Title
        </label>
        <input
          id="task-title"
          type="text"
          className={`form-input ${error ? 'form-input-error' : ''}`}
          placeholder="Enter task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />
        {error && <span className="form-error">{error}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="task-description" className="form-label">
          Description
        </label>
        <textarea
          id="task-description"
          className="form-textarea"
          placeholder="Enter task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      {mode === 'edit' && (
        <div className="form-group">
          <label className="form-label">Status</label>
          <StatusPicker value={status} onChange={setStatus} />
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {mode === 'edit' ? 'Update Task' : 'Add Task'}
        </button>
        {mode === 'edit' && onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;

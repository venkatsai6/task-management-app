import type { Task, TaskStatus } from '../types';
import { Pencil, Trash2, Check, Clock, Loader } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusConfig: Record<TaskStatus, { icon: typeof Check; color: string; bg: string }> = {
  Pending: { icon: Clock, color: '#6b7280', bg: '#f3f4f6' },
  'In Progress': { icon: Loader, color: '#a16207', bg: '#fef9c3' },
  Completed: { icon: Check, color: '#16a34a', bg: '#dcfce7' },
};

function TaskItem({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) {
  const config = statusConfig[task.status];
  const StatusIcon = config.icon;
  const isCompleted = task.status === 'Completed';

  const cycleStatus = () => {
    const order: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];
    const currentIdx = order.indexOf(task.status);
    const nextStatus = order[(currentIdx + 1) % order.length];
    onStatusChange(task.id, nextStatus);
  };

  return (
    <div className={`task-item ${isCompleted ? 'task-completed' : ''}`}>
      <button
        className="task-status-btn"
        onClick={cycleStatus}
        style={{ backgroundColor: config.bg, color: config.color }}
        title={`Status: ${task.status} (click to change)`}
        aria-label={`Mark as next status. Currently: ${task.status}`}
      >
        <StatusIcon size={16} />
      </button>

      <div className="task-content">
        <span className={`task-title ${isCompleted ? 'task-title-completed' : ''}`}>
          {task.title}
        </span>
        {task.description && (
          <span className="task-description">{task.description}</span>
        )}
      </div>

      <div className="task-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
          aria-label="Edit task"
        >
          <Pencil size={16} />
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

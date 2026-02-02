import { useState } from 'react';
import type { Task, TaskStatus } from '../types';
import TaskItem from './TaskItem';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusOrder: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];

function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (status: string) => {
    setCollapsed((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const grouped = statusOrder.reduce<Record<TaskStatus, Task[]>>(
    (acc, status) => {
      acc[status] = tasks.filter((t) => t.status === status);
      return acc;
    },
    { Pending: [], 'In Progress': [], Completed: [] }
  );

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {statusOrder.map((status) => {
        const items = grouped[status];
        if (items.length === 0) return null;

        const isCollapsed = collapsed[status] ?? false;
        const Arrow = isCollapsed ? ChevronRight : ChevronDown;

        return (
          <div key={status} className="task-group">
            <button
              className="group-header"
              onClick={() => toggleGroup(status)}
              aria-expanded={!isCollapsed}
            >
              <Arrow size={18} className="group-arrow" />
              <span className="group-title">{status}</span>
              <span className="group-count">{items.length}</span>
            </button>

            {!isCollapsed && (
              <div className="group-items">
                {items.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;

import { useState, useRef, useEffect } from 'react';
import type { TaskStatus } from '../types';
import { ChevronDown } from 'lucide-react';

interface StatusPickerProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
  { value: 'Pending', label: 'Pending', color: '#9ca3af' },
  { value: 'In Progress', label: 'In Progress', color: '#eab308' },
  { value: 'Completed', label: 'Completed', color: '#22c55e' },
];

function StatusPicker({ value, onChange }: StatusPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = statusOptions.find((o) => o.value === value)!;

  return (
    <div className="status-picker" ref={ref}>
      <button
        type="button"
        className="status-picker-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="status-dot" style={{ backgroundColor: selected.color }} />
        <span className="status-picker-label">{selected.label}</span>
        <ChevronDown size={16} className={`status-picker-arrow ${open ? 'status-picker-arrow-open' : ''}`} />
      </button>

      {open && (
        <ul className="status-picker-dropdown" role="listbox">
          {statusOptions.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`status-picker-option ${option.value === value ? 'status-picker-option-active' : ''}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span className="status-dot" style={{ backgroundColor: option.color }} />
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StatusPicker;

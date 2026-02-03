import { useState, useEffect } from 'react';
import type { Task, TaskStatus } from '../types';

export const useTasks = () => {
    // Initialize from LocalStorage or empty array
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');

    // Persist to LocalStorage whenever tasks change
    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch {
            // Storage full or unavailable
        }
    }, [tasks]);

    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(), // Native browser ID generator
            title,
            description,
            status: 'Pending', // Default status per design seems to be Pending or In Progress
            createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const updateTask = (id: string, updatedFields: Partial<Task>) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    // Filter tasks based on search query and status filter
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return {
        tasks: filteredTasks,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        addTask,
        updateTask,
        deleteTask,
    };
};
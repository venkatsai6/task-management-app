# Task Management Application

A responsive task management (to-do) application built with **React 19**, **TypeScript**, and **Vite**. It supports creating, editing, deleting, and organizing tasks by status, with dark mode and localStorage persistence.

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (comes with Node.js)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd task-management-app

# Install dependencies
npm install
```

## Running the App

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

---

## Features

### 1. Task CRUD Operations

- **Add** -- Enter a title (required) and optional description. New tasks default to **Pending** status.
- **Edit** -- Click the pencil icon to update the title, description, or status via a custom status picker.
- **Delete** -- Click the trash icon to remove a task immediately.

### 2. Status Management

Each task cycles through three statuses via a clickable status button:

| Status          | Color  | Icon   |
| --------------- | ------ | ------ |
| **Pending**     | Grey   | Clock  |
| **In Progress** | Yellow | Loader |
| **Completed**   | Green  | Check  |

Tasks are grouped into collapsible accordion sections by status, each with a count badge. Empty groups are hidden.

### 3. Search and Status Filter

- **Search bar** filters tasks by title in real time (case-insensitive).
- **Filter chips** (`All`, `Pending`, `In Progress`, `Completed`) narrow the list by status.
- Both filters work together simultaneously.

### 4. Persistence

All tasks are saved to `localStorage` automatically and restored on page reload.

### 5. Dark Mode

Toggle between light and dark themes via the header icon. The preference is persisted to `localStorage` and defaults to the system preference on first visit.

### 6. Toast Notifications

A notification chip confirms every task action (create, update, delete, status change) with auto-dismiss after 3 seconds.

### 7. Responsive Design

- **Mobile (< 1028px):** Single-panel view with a floating action button. Task list and form alternate.
- **Desktop (>= 1028px):** Two-panel grid layout with the task list on the left and the form on the right.

---

## Project Structure

```text
src/
├── components/
│   ├── DoodleIllustration.tsx # Animated SVG doodle illustration
│   ├── Notification.tsx       # Toast notification component
│   ├── StatusPicker.tsx       # Custom dropdown for status selection
│   ├── TaskForm.tsx           # Shared form for adding and editing tasks
│   ├── TaskItem.tsx           # Individual task row with status and actions
│   └── TaskList.tsx           # Accordion-grouped task list by status
├── hooks/
│   ├── useMediaQuery.ts       # Responsive breakpoint detection
│   ├── useNotification.ts     # Toast notification state and auto-dismiss
│   ├── useTask.ts             # Task CRUD, localStorage, search, and status filter
│   └── useTheme.ts            # Dark/light theme toggle with localStorage
├── styles/
│   └── App.css                # All styles with CSS variables for theming
├── App.tsx                    # Root component, layout, and view routing
├── index.css                  # Root element sizing
├── main.tsx                   # React entry point
└── types.ts                   # TypeScript type definitions (Task, TaskStatus)
```

---

## Tech Stack

| Technology   | Version | Purpose                                   |
| ------------ | ------- | ----------------------------------------- |
| React        | 19.2    | UI library                                |
| TypeScript   | 5.9     | Type safety                               |
| Vite         | 7.2     | Build tool and dev server                 |
| Lucide React | 0.563   | Icon library (Pencil, Trash, Check, etc.) |
| ESLint       | 9.39    | Code linting with React hooks rules       |

All state is managed with React's built-in `useState` and `useEffect` hooks -- no external state management library.

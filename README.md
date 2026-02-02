# Task Management Application

A responsive task management (to-do) application built with **React 19**, **TypeScript**, and **Vite**. It supports creating, editing, deleting, and organizing tasks by status, with dark mode and localStorage persistence.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Component Breakdown](#component-breakdown)
- [Custom Hooks](#custom-hooks)
- [Styling and Theming](#styling-and-theming)

---

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

### 1. Add Task

Enter a task title and an optional description in the Add Task form and click **"Add Task"**. The new task is created with a default status of **Pending** and added to the top of the list. The title field is required -- submitting an empty title shows a validation error.

### 2. Edit Task

Click the pencil icon on any task to open the Edit Task form. The form pre-fills with the task's current title, description, and status. Change any field and click **"Update Task"** to save, or **"Cancel"** to discard changes.

### 3. Delete Task

Click the trash icon on any task to remove it from the list immediately.

### 4. Mark Task Status (Cycle)

Each task has a circular status button on the left. Click it to cycle the status through three states:

| Status          | Color  | Icon   |
| --------------- | ------ | ------ |
| **Pending**     | Grey   | Clock  |
| **In Progress** | Yellow | Loader |
| **Completed**   | Green  | Check  |

Completed tasks are visually distinguished with strikethrough text and reduced opacity.

### 5. Status Grouped Accordion

Tasks in the list are grouped into collapsible accordion sections by status (**Pending**, **In Progress**, **Completed**). Each group header shows the status name and a count badge. Click a group header to expand or collapse it. Empty groups are hidden automatically.

### 6. Custom Status Picker

When editing a task, the status field uses a custom dropdown instead of a native `<select>`. Each option displays a color dot on the left (grey, yellow, green) for quick visual identification. The dropdown closes on outside click and supports ARIA attributes for accessibility.

### 7. Search

Type in the search bar at the top of the task list to filter tasks by title in real time. The filter is case-insensitive and applies across all status groups.

### 8. LocalStorage Persistence

All tasks are saved to `localStorage` automatically whenever the task list changes. On page reload, tasks are restored from storage so nothing is lost. All storage operations are wrapped in `try/catch` blocks, so the app degrades gracefully in environments where `localStorage` is unavailable (e.g., private browsing, storage quota exceeded).

### 9. Dark Mode

Click the moon/sun icon in the header to toggle between light and dark themes. The preference is:

- Persisted to `localStorage` so it survives page reloads.
- On first visit, defaults to the system preference (`prefers-color-scheme`).

All colors are defined through CSS custom properties, so the theme switch is smooth with transition animations.

### 10. Toast Notifications

After every task action, a notification chip appears at the bottom center of the screen to confirm the operation:

| Action        | Message                    | Color |
| ------------- | -------------------------- | ----- |
| Create task   | Task created successfully  | Green |
| Update task   | Task updated successfully  | Green |
| Delete task   | Task deleted               | Red   |
| Status change | Task status updated        | Blue  |

Notifications slide in from the bottom, auto-dismiss after 3 seconds with a fade-out animation, and support both light and dark themes.

### 11. Responsive Design

The app adapts to two layouts based on a **1028px** breakpoint:

- **Mobile (< 1028px):** Single-panel card view (375-430px width). The task list and form are shown one at a time with navigation. A floating action button (FAB) opens the Add Task form.
- **Desktop (>= 1028px):** Two-panel grid layout. The task list is always visible on the left, and the form (Add/Edit) is always visible on the right.

---

## Project Structure

```text
src/
├── components/
│   ├── DoodleIllustration.tsx # Animated SVG doodle illustration
│   ├── Notification.tsx       # Toast notification chip component
│   ├── StatusPicker.tsx       # Custom dropdown with color-coded status options
│   ├── TaskForm.tsx           # Reusable form for adding and editing tasks
│   ├── TaskItem.tsx           # Individual task row with status, actions
│   └── TaskList.tsx           # Accordion-grouped task list by status
├── hooks/
│   ├── useMediaQuery.ts       # Tracks CSS media query matches for responsive layout
│   ├── useNotification.ts     # Toast notification state with auto-dismiss and fade-out
│   ├── useTask.ts             # Task CRUD operations + localStorage + search
│   └── useTheme.ts            # Dark/light theme toggle with localStorage
├── styles/
│   └── App.css                # All styles with CSS variables for theming
├── App.tsx                    # Root component, layout, view routing
├── index.css                  # Root element sizing
├── main.tsx                   # React entry point
└── types.ts                   # TypeScript type definitions (Task, TaskStatus)
```

---

## Tech Stack

| Technology   | Version | Purpose                                    |
| ------------ | ------- | ------------------------------------------ |
| React        | 19.2    | UI library                                 |
| TypeScript   | 5.9     | Type safety                                |
| Vite         | 7.2     | Build tool and dev server                  |
| Lucide React | 0.563   | Icon library (Pencil, Trash, Check, etc.)  |
| ESLint       | 9.39    | Code linting with React hooks rules        |

| Inter (Google Fonts) | 4 weights | Typography -- clean, modern sans-serif optimized for screens |

No additional state management library is used. All state is managed with React's built-in `useState` and `useEffect` hooks.

---

## Component Breakdown

### `App` (`src/App.tsx`)

The root component that orchestrates the entire application.

- Manages the **view state** (`LIST`, `ADD`, `EDIT`) to control which panel is visible on mobile.
- On desktop, both panels are always rendered side by side using CSS Grid.
- Delegates all task operations (`add`, `update`, `delete`, `statusChange`) to the `useTasks` hook.
- Renders the dark mode toggle button in the list panel header.

### `TaskList` (`src/components/TaskList.tsx`)

Displays all tasks grouped by status in collapsible accordion sections.

- Groups tasks into three categories: Pending, In Progress, Completed.
- Each group has a clickable header with a chevron icon and count badge.
- Empty groups are not rendered.
- Shows an empty state message when no tasks exist.

### `TaskItem` (`src/components/TaskItem.tsx`)

Renders a single task row.

- **Status button:** A color-coded circular button (grey/yellow/green) that cycles through statuses on click.
- **Content area:** Shows the task title (with strikethrough for completed) and description.
- **Action buttons:** Edit (pencil) and Delete (trash) icons that appear on each row.

### `TaskForm` (`src/components/TaskForm.tsx`)

A dual-purpose form used for both adding and editing tasks.

- **Add mode:** Shows title and description fields. Resets after submission.
- **Edit mode:** Pre-fills all fields from the selected task. Adds the `StatusPicker` dropdown and a Cancel button.
- Validates that the title is not empty before submission.

### `StatusPicker` (`src/components/StatusPicker.tsx`)

A custom dropdown component that replaces the native `<select>` for status selection.

- Each option shows a colored dot: grey (Pending), yellow (In Progress), green (Completed).
- Opens/closes on click with an animated chevron arrow.
- Closes automatically when clicking outside (via `useRef` and `mousedown` listener).
- Uses `role="listbox"` and `role="option"` ARIA attributes for accessibility.

---

## Custom Hooks

### `useTasks` (`src/hooks/useTask.ts`)

Central state management for all task operations.

```ts
const { tasks, searchQuery, setSearchQuery, addTask, updateTask, deleteTask } = useTasks();
```

- **`tasks`** -- the filtered task array (filtered by `searchQuery`).
- **`addTask(title, description)`** -- creates a new task with `Pending` status and a `crypto.randomUUID()` ID.
- **`updateTask(id, fields)`** -- partially updates a task by ID.
- **`deleteTask(id)`** -- removes a task by ID.
- **Persistence:** Reads from `localStorage` on mount; writes to `localStorage` on every change via `useEffect`. All storage access is wrapped in `try/catch` to handle unavailable or full storage gracefully.
- **Search:** Filters tasks by title (case-insensitive) based on `searchQuery`.

### `useNotification` (`src/hooks/useNotification.ts`)

Manages toast notification state with auto-dismiss and fade-out animation.

```ts
const { notification, fading, showNotification, clearNotification } = useNotification();
```

- **`notification`** -- the current notification object `{ message, type }` or `null`.
- **`fading`** -- boolean that turns `true` when the fade-out animation starts.
- **`showNotification(message, type)`** -- displays a notification. Accepts `'success'`, `'error'`, or `'info'` as the type.
- **`clearNotification()`** -- dismisses the notification immediately.
- Auto-dismisses after 3 seconds, with a 400ms fade-out animation before removal.
- Rapid successive calls reset the timer so only the latest notification is shown.

### `useTheme` (`src/hooks/useTheme.ts`)

Manages the light/dark theme toggle.

```ts
const { theme, toggleTheme } = useTheme();
```

- Initializes from `localStorage`, falling back to the system `prefers-color-scheme` preference. Storage reads are wrapped in `try/catch` so the fallback is always used when storage is unavailable.
- Sets `data-theme` attribute on `<html>` so CSS variables switch between light and dark palettes.
- Persists the choice to `localStorage` (silently skipped if storage is unavailable).

### `useMediaQuery` (`src/hooks/useMediaQuery.ts`)

Tracks whether a CSS media query matches.

```ts
const isDesktop = useMediaQuery('(min-width: 1028px)');
```

- Listens to the `change` event on `window.matchMedia`.
- Returns a boolean that updates reactively when the viewport crosses the breakpoint.

---

## Styling and Theming

All styles live in `src/styles/App.css` using **CSS custom properties** (variables) for theming. The app uses **Inter** from Google Fonts (weights 400, 500, 600, 700) as its primary typeface, with system font fallbacks.

### Light Theme (default)

- Background: `#f3f4f6` (light grey)
- Surface/cards: `#ffffff` (white)
- Text: `#1f2937` (near-black)
- Primary: `#0047AB` (blue)

### Dark Theme

- Background: `#111827` (dark navy)
- Surface/cards: `#1f2937` (dark grey)
- Text: `#f9fafb` (near-white)
- Primary: `#3b82f6` (bright blue)

The theme is toggled by setting `data-theme="dark"` on the root `<html>` element. All CSS rules reference `var(--color-*)` variables, so the entire UI updates instantly with smooth `0.2s` transitions.

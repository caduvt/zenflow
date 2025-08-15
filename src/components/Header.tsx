'use client';

import { useTasks } from '@/hooks/TaskContext';
import { useTheme } from '@/hooks/ThemeContext';
import StorageService from '@/services/StorageService';
import { Moon, Sun, Trash } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { refreshTasks } = useTasks();
  const { isDark, toggleDarkMode } = useTheme();

  const handleClearTasks = () => {
    StorageService.clearTasks();
    refreshTasks();
  };

  return (
    <header className="flex justify-between items-center p-4 text-xl w-screen">
      <div>
        <Link
          href="/"
          className="text-3xl font-bold cursor-pointer block underline decoration-green-400 hover:scale-105 duration-200"
        >
          zenflow
        </Link>
      </div>
      <div className="flex gap-4">
        <button
          onClick={toggleDarkMode}
          className="cursor-pointer flex gap-2 border text-gray-700 hover:scale-105 duration-200 hover:text-red-400 border-gray-700 hover:border-red-400 rounded-md p-2 hover:shadow-cartoon"
        >
          {isDark ? <Sun /> : <Moon />}
          <span>{isDark ? 'light theme' : 'dark theme'}</span>
        </button>
        <button
          onClick={handleClearTasks}
          className="cursor-pointer flex gap-2 border text-gray-700 hover:scale-105 duration-200 hover:text-red-400 border-gray-700 hover:border-red-400 rounded-md p-2 hover:shadow-cartoon"
        >
          <Trash />
          <span>clear tasks</span>
        </button>
      </div>
    </header>
  );
}

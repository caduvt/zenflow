'use client';

import StorageService from '@/services/StorageService';
import Task from '@/types/Task';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type TaskContextType = {
  tasks: Task[];
  refreshTasks: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(StorageService.getAllTasks());
  }, []);

  function refreshTasks() {
    return setTasks(StorageService.getAllTasks());
  }

  return (
    <TaskContext.Provider value={{ tasks, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};

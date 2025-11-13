'use client';

import { useTasks } from '@/hooks/TaskContext';
import StorageService from '@/services/StorageService';
import InputPlaceholders from '@/types/InputPlaceholders';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';

type Props = {
  title: string;
};

const defaultTasks = [
  { text: '', id: Date.now() },
  { text: '', id: Date.now() + 1 },
  { text: '', id: Date.now() + 2 },
];

export default function TaskList({ title }: Props) {
  const { tasks, refreshTasks } = useTasks();

  const handleUpdateTask = (id: number, text: string) => {
    StorageService.updateTask({ id, text });
    refreshTasks();
  };

  const handleRemoveTask = (id: number) => {
    StorageService.removeTask(id);
    refreshTasks();
  };

  const handleAddTask = () => {
    StorageService.addNewTask();
    refreshTasks();
  };

  const placeholderIndices = useMemo(() => {
    const indices: number[] = [];
    const available = [...Array(InputPlaceholders.length).keys()];
    for (let i = 0; i < tasks.length; i++) {
      const rand = Math.floor(Math.random() * available.length);
      indices.push(available.splice(rand, 1)[0]);
    }
    return indices;
  }, [tasks.length]);

  return (
    <div className="rounded-2xl w-full md:w-[40%] flex flex-col gap-2 p-4">
      <h1 className="text-center">{title}</h1>
      {(tasks.length ? tasks : defaultTasks).map((item, index) => (
        <div key={item.id} className="flex relative">
          <input
            type="text"
            placeholder={InputPlaceholders[placeholderIndices[index]]}
            value={item.text}
            onChange={(e) => handleUpdateTask(item.id, e.target.value)}
            className="flex-1 w-full bg-gray-200 outline-none text-gray-800 p-2 rounded"
          />
          <button
            type="button"
            onClick={() => handleRemoveTask(item.id)}
            tabIndex={-1}
            className="cursor-pointer bg-green-400 p-2 px-4 opacity-0 scale-90 hover:scale-100 hover:opacity-100 duration-200 rounded-r absolute right-0"
          >
            <span className="text-gray-800">done?</span>
          </button>
        </div>
      ))}
      <button
        className="cursor-pointer bg-green-400 p-2 flex gap-2 justify-center items-center rounded-2xl hover:shadow-cartoon duration-200 hover:scale-101"
        onClick={handleAddTask}
      >
        <span className="text-gray-800">add new task</span>
        <Plus />
      </button>
    </div>
  );
}

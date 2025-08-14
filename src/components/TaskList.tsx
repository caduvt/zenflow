'use client';

import StorageService from '@/services/StorageService';
import { Plus } from 'lucide-react';

export default function TaskList() {
  const tasks = StorageService.getAllTasks();

  return (
    <div className="rounded-2xl w-[40%] flex flex-col gap-2">
      {tasks.map((item) => (
        <div key={item.id} className="flex">
          <input
            type="text"
            onChange={(e) =>
              StorageService.updateTask({
                id: item.id,
                text: e.target.value,
              })
            }
            className="border-gray-200 border-2 flex-1"
          />
          <button
            type="button"
            onClick={() => StorageService.removeTask(item.id)}
            className="cursor-pointer bg-green-400 p-1 opacity-0 scale-90 hover:scale-100 hover:opacity-100 duration-200 rounded-r-2xl relative right-0"
          >
            <span>done?</span>
          </button>
        </div>
      ))}
      <button className="cursor-pointer bg-green-400 p-2 flex gap-2 justify-center items-center rounded-2xl">
        <span className="text-gray-800">add new task</span>
        <Plus />
      </button>
    </div>
  );
}

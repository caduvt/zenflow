import { TASKS_STORAGE } from '@/Constants';
import Task from '@/types/Task';

export default class StorageService {
  static addNewTask() {
    try {
      const tasks = this.getAllTasks();
      const updatedTasks = [
        ...tasks,
        {
          text: '',
          id: Date.now(),
        },
      ];
      localStorage.setItem(TASKS_STORAGE, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error: cannot add new task!', error);
    }
  }

  static getAllTasks(): Task[] {
    try {
      const tasks = localStorage.getItem(TASKS_STORAGE);
      if (!tasks) {
        return this.clearTasks();
      }
      return JSON.parse(tasks);
    } catch (error) {
      console.error('Error: cannot get all tasks!', error);
      return [];
    }
  }

  static updateTask(updatedTask: Task) {
    const tasks = this.getAllTasks();
    const updatedTasks = tasks.map((item) =>
      item.id === updatedTask.id ? updatedTask : item,
    );
    localStorage.setItem(TASKS_STORAGE, JSON.stringify(updatedTasks));
  }

  static removeTask(id: number) {
    const tasks = this.getAllTasks();
    // if the is only 3 tasks, the removed task will be
    //replaced by an empty one
    const index = tasks.findIndex((item) => item.id === id);
    console.log(index);
    let filteredTasks = tasks.filter((item) => item.id !== id);
    if (index <= 2)
      filteredTasks = [
        filteredTasks[0],
        filteredTasks[1],
        { text: '', id: Date.now() },
      ].concat(filteredTasks.slice(3, -1));
    localStorage.setItem(TASKS_STORAGE, JSON.stringify(filteredTasks));
  }

  // By default, the task list initializes with
  // 3 empty tasks
  static clearTasks() {
    const newTaskStorage: Task[] = Array(3)
      .fill({
        text: '',
        id: Date.now(),
      })
      .map((item, index) => ({
        ...item,
        id: item.id + index,
      }));
    localStorage.setItem(TASKS_STORAGE, JSON.stringify(newTaskStorage));
    return newTaskStorage;
  }
}

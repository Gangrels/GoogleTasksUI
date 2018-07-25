import SessionStore from './SessionStore.js';
import TaskListStore from './TaskListStore.js';
import TaskStore from './TaskStore.js';

const store = new SessionStore();
export const taskStore = new TaskListStore();
export const allTasks = new TaskStore();

export default store;
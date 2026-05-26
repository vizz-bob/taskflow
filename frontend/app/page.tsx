
'use client';
import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

const API_URL = '';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchTasks(); }, []);

  async function fetchTasks() {
    try {
      const res = await fetch(`${API_URL}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  }

  async function createTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask }),
      });
      const task = await res.json();
      setTasks([task, ...tasks]);
      setNewTask('');
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  }

  async function deleteTask(id: number) {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">TaskFlow</h1>
      <form onSubmit={createTask} className="flex gap-2 mb-8">
        <input type="text" value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border rounded px-3 py-2" />
        <button type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add
        </button>
      </form>
      {loading ? <p>Loading...</p> : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-3 p-3 border rounded">
              <span className="flex-1">{task.title}</span>
              <button onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}



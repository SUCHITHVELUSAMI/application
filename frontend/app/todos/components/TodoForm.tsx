// /frontend/app/todos/components/TodoForm.tsx

"use client"; // Mark as a Client Component

import React, { useState } from 'react';
import axios from 'axios';

// Define the prop types
interface TodoFormProps {
  refreshTodos: () => void; // Explicitly typing the refreshTodos function
}

const TodoForm: React.FC<TodoFormProps> = ({ refreshTodos }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('in progress');
  const [time, setTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/todos', {
        name,
        description,
        status,
        time,
      });
      refreshTodos(); // Call to refresh the todos after adding a new one
      setName('');
      setDescription('');
      setStatus('in progress');
      setTime('');
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

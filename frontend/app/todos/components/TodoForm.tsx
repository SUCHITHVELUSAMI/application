"use client"; // Ensure this is a client component

import React, { useState } from 'react';
import { Todo } from '../../types'; // Ensure this path is correct

interface TodoFormProps {
  onTodoCreated: (newTodo: Omit<Todo, 'id'>) => Promise<void>; // Ensure this matches the type definition
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed' | 'in progress'>('pending'); // Include 'in progress' status

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = { title, description, status };
    await onTodoCreated(newTodo);
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setStatus('pending'); // Reset status to default
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value as 'pending' | 'completed' | 'in progress')}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="in progress">In Progress</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

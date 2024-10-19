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
  const [error, setError] = useState<string | null>(null); // State for error message
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error message
    setLoading(true); // Start loading indicator

    // Basic validation
    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      setLoading(false); // Stop loading indicator
      return;
    }

    const newTodo = { title, description, status };
    try {
      await onTodoCreated(newTodo);
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setStatus('pending'); // Reset status to default
    } catch (err) {
      setError("Failed to create todo."); // Handle potential error
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>} {/* Error message display */}
      <label>
        <span>Title:</span>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded"
        />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
      </label>
      <label>
        <span>Status:</span>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value as 'pending' | 'completed' | 'in progress')}
          className="border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="in progress">In Progress</option>
        </select>
      </label>
      <button 
        type="submit" 
        className={`bg-blue-500 text-white rounded px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
        disabled={loading} // Disable button when loading
      >
        {loading ? 'Adding...' : 'Add Todo'} {/* Change button text based on loading state */}
      </button>
    </form>
  );
};

export default TodoForm;

"use client"; // Use this directive for client-side rendering

import React, { useState } from 'react';
import axios from 'axios';

interface TodoFormProps {
  refreshTodos: () => void;
}

export const STATUS_OPTIONS = {
  IN_PROGRESS: 'in progress',
  COMPLETED: 'completed',
};

const TodoForm: React.FC<TodoFormProps> = ({ refreshTodos }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(STATUS_OPTIONS.IN_PROGRESS);
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // For success message
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null); // Reset success message
    setLoading(true);

    // Basic validation
    if (!name || !description || !time) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    // Check if the time is a valid future date
    const selectedTime = new Date(time);
    if (isNaN(selectedTime.getTime()) || selectedTime <= new Date()) {
      setError('Please select a valid future time.');
      setLoading(false);
      return;
    }

    // Convert the time to ISO 8601 format (UTC)
    const formattedTime = selectedTime.toISOString();

    const token = localStorage.getItem('token'); // Retrieve the token

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, {
        name,
        description,
        status,
        time: formattedTime,  // Send formatted time
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the authorization header
        },
      });
      refreshTodos(); // Refresh the todo list
      // Clear input fields
      setName('');
      setDescription('');
      setStatus(STATUS_OPTIONS.IN_PROGRESS);
      setTime('');
      setSuccess('Todo added successfully!'); // Set success message
    } catch (error) {
      console.error('Failed to create todo:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
        setError(`Error ${error.response.status}: ${error.response.data.message || 'Failed to create todo.'}`);
      } else {
        setError('Failed to create todo. Please check your network connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message" aria-live="assertive">{error}</p>}
      {success && <p className="success-message" aria-live="polite">{success}</p>}

      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="time">Time</label>
      <input
        id="time"
        type="datetime-local" // Updated to type "datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <label htmlFor="status">Status</label>
      <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value={STATUS_OPTIONS.IN_PROGRESS}>In Progress</option>
        <option value={STATUS_OPTIONS.COMPLETED}>Completed</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;

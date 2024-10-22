// TodoForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface TodoFormProps {
  refreshTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ refreshTodos }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('in progress');
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/api/todos', {
        name,
        description,
        status,
        time,
      });
      refreshTodos(); // Refresh the todo list
      setName('');
      setDescription('');
      setStatus('in progress');
      setTime('');
    } catch (error) {
      console.error('Failed to create todo:', error);
      setError('Failed to create todo. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <label htmlFor="name">Name</label>
      <input id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      
      <label htmlFor="description">Description</label>
      <input id="description" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      
      <label htmlFor="time">Time</label>
      <input id="time" type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required />
      
      <label htmlFor="status">Status</label>
      <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;

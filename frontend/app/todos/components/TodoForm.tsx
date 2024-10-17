// /home/hp/application/frontend/app/todos/components/TodoForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onTodoCreated }) => {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/todos', { text: todoText }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTodoCreated(); // Callback to refresh todos
      setTodoText(''); // Clear input after creation
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/todos'); // Adjust the API endpoint as needed
    setTodos(response.data);
  };

  const handleCreate = async (newTodo) => {
    await axios.post('http://localhost:3000/todos', newTodo);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    fetchTodos();
  };

  const handleUpdate = async (todo) => {
    const updatedTodo = { ...todo, status: 'completed' }; // Update as needed
    await axios.put(`http://localhost:3000/todos/${todo.id}`, updatedTodo);
    fetchTodos();
  };

  return (
    <div>
      <h1>Todo Application</h1>
      <TodoForm onCreate={handleCreate} />
      <TodoList todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default App;

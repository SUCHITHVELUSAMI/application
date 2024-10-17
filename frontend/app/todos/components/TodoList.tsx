// /home/hp/application/frontend/app/todos/components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = ({ onTodoDeleted, onTodoUpdated }) => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem('token');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data.todos); // Adjust based on your backend response structure
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos(); // Refresh the list
    if (onTodoDeleted) onTodoDeleted(); // Call the parent's delete handler if exists
  };

  const handleUpdate = async (todo) => {
    await axios.put(`http://localhost:3000/todos/${todo.id}`, { ...todo, status: 'completed' }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos(); // Refresh the list
    if (onTodoUpdated) onTodoUpdated(); // Call the parent's update handler if exists
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on mount
  }, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => handleUpdate(todo)}>Complete</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

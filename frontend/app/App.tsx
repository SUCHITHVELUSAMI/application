import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './todos/components/TodoList';
import TodoForm from './todos/components/TodoForm';
import ProtectedRoute from './todos/components/ProtectedRoute'; // Import the ProtectedRoute component
import { useNavigate } from 'react-router-dom'; // If using React Router

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, [navigate, currentPage]);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:3000/todos?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data.todos);
      setTotalPages(response.data.totalPages); // Assume your backend returns total pages
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch todos.';
      setError(errorMessage);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newTodo) => {
    setError('');
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/todos', newTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create todo.';
      setError(errorMessage);
      console.error('Error creating todo:', err);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete todo.';
      setError(errorMessage);
      console.error('Error deleting todo:', err);
    }
  };

  const handleUpdate = async (todo) => {
    const updatedTodo = { ...todo, status: 'completed' };
    setError('');
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/todos/${todo.id}`, updatedTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update todo.';
      setError(errorMessage);
      console.error('Error updating todo:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-4">Todo Application</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          <TodoForm onCreate={handleCreate} />
          <ProtectedRoute>
            <TodoList
              todos={todos}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </ProtectedRoute>
        </>
      )}
    </div>
  );
};

export default App;

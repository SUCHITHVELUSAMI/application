"use client"; // Use this directive for client-side rendering

import React from 'react';
import Link from 'next/link';
import axios from 'axios';

type TodoStatus = 'in progress' | 'completed';

interface Todo {
  id: string; // Keep this consistent with your backend
  name: string;
  description: string;
  status: TodoStatus;
}

interface TodoListProps {
  todos: Todo[];
  refreshTodos: () => void; // Add refreshTodos function prop to handle state updates after delete
}

const TodoList: React.FC<TodoListProps> = ({ todos, refreshTodos }) => {
  // Function to get status color based on the todo status
  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in progress':
        return 'orange';
      default:
        return 'black'; // Fallback for unexpected status
    }
  };

  // Function to handle the delete operation
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) {
      console.error('No token found. User might not be logged in.');
      alert('You need to be logged in to delete todos.'); // Notify the user
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''; // Ensure API URL is defined
      await axios.delete(`${apiUrl}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization header
        },
      });
      refreshTodos(); // Refresh the todo list after deletion
    } catch (error: any) {
      console.error('Failed to delete todo:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Failed to delete todo.'}`);
        
        if (error.response.status === 401) {
          // Handle unauthorized error (e.g., redirect to login)
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token'); // Clear the token
          window.location.href = '/login'; // Redirect to login
        }
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h3>Todo Items</h3>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: '1rem' }}>
              <Link href={`/todos/${todo.id}`} passHref>
                <div style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                  <h4>{todo.name}</h4>
                  <p>{todo.description || 'No description provided.'}</p>
                  <p style={{ color: getStatusColor(todo.status) }}>
                    Status: {todo.status}
                  </p>
                </div>
              </Link>
              <button onClick={() => handleDelete(todo.id)} style={{ marginTop: '0.5rem' }}>
                Delete
              </button> {/* Optional delete button */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Todo {
  id: number; // Change to number if your backend uses numbers for IDs
  name: string;
  description: string;
  status: 'in progress' | 'completed' | 'pending'; // Include pending status if applicable
  time: string;
}

const TodoDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Use effect to fetch todo details based on ID
  useEffect(() => {
    const fetchTodo = async () => {
      const { id } = params; // Accessing ID from params

      if (id) {
        setLoading(true); // Set loading to true when starting to fetch
        try {
          const token = localStorage.getItem('token'); // Retrieve the token
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''; // Ensure API URL is defined
          
          const response = await axios.get(`${apiUrl}/api/todos/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in headers
            },
          });

          setTodo(response.data);
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              alert('Session expired. Please log in again.');
              router.push('/login'); // Redirect to login if unauthorized
            } else {
              setError(error.response?.data?.message || 'Failed to fetch todo details.');
            }
          } else {
            setError('Network error. Please try again later.');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTodo();
  }, [params, router]); // Include router in dependencies

  // Show loading or error messages
  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <p className="error-message">{error}</p>;
  if (!todo) return <p className="error-message">Todo not found.</p>;

  // Handle deletion of todo
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''; // Ensure API URL is defined
        
        await axios.delete(`${apiUrl}/api/todos/${todo.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        });
        router.push('/todos'); // Redirect after deletion
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          setError('Failed to delete todo. Please try again.');
        } else {
          alert('Network error. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="todo-container">
      <h2>{todo.name}</h2>
      <p>{todo.description || 'No description provided.'}</p>
      <p>Status: {todo.status}</p>
      <p>Time: {todo.time || 'No time set.'}</p>
      
      <div className="button-group">
        <button onClick={() => router.push(`/todos/edit/${todo.id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TodoDetails;

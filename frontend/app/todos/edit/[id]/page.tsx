"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Todo {
  id: string;
  name: string;
  description: string;
  status: 'in progress' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

const EditTodo: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch todo details based on ID
  useEffect(() => {
    const fetchTodo = async () => {
      const { id } = params; // Use params to get the dynamic ID

      if (id) {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTodo(response.data);
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              alert('Session expired. Please log in again.');
              router.push('/login');
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
  }, [params]); // Depend on params to re-fetch when it changes

  // Handle todo update
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    if (todo) {
      try {
        const token = localStorage.getItem('token');

        // Create a copy of the todo without id, createdAt, and updatedAt
        const { id, createdAt, updatedAt, ...updatedTodo } = todo; // Destructure to exclude these fields

        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}`, updatedTodo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Todo updated successfully.');
        router.push('/todos'); // Redirect after update
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'Failed to update todo.');
        } else {
          setError('Network error. Please try again later.');
        }
      }
    }
  };

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <p className="error-message">{error}</p>;
  if (!todo) return <p className="error-message">Todo not found.</p>;

  return (
    <div>
      <h2>Edit Todo</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={todo.name}
            onChange={(e) => setTodo({ ...todo, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={todo.status}
            onChange={(e) => setTodo({ ...todo, status: e.target.value as 'in progress' | 'completed' })}
            required
          >
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditTodo;

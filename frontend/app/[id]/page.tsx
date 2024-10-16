"use client";  // Mark this as a Client Component

import { useEffect, useState } from 'react';
import TodoForm from '../ components/TodoForm';  // Import the reusable TodoForm component
import { updateTodoStatus, fetchTodoById } from '../../services/api';  // Import API functions
import { useParams } from 'next/navigation';  // Correct hook for accessing dynamic params

const UpdateTodoPage = () => {
  const { id } = useParams();  // Get the ID from the URL
  const [todo, setTodo] = useState(null);  // State to hold the fetched todo

  useEffect(() => {
    const loadTodo = async () => {
      if (Array.isArray(id)) {
        // If `id` is an array, use the first element
        const response = await fetchTodoById(id[0]);
        setTodo(response.data);
      } else if (typeof id === 'string') {
        // If `id` is a string, fetch directly
        const response = await fetchTodoById(id);
        setTodo(response.data);
      }
    };
    loadTodo();
  }, [id]);  // Load todo when the ID changes

  const onSubmit = async (data: any) => {
    try {
      await updateTodoStatus(id, data.status);  // Update todo status in the API
      // Redirect or show success message here (you can use useRouter for redirection)
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <div>
      <h1>Update Todo</h1>
      {todo ? <TodoForm initialValues={todo} onSubmit={onSubmit} /> : <p>Loading...</p>}  {/* Show loading until todo is fetched */}
    </div>
  );
};

export default UpdateTodoPage;

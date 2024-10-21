// /frontend/app/todos/[id]/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Todo {
  id: string;
  name: string;
  description: string;
  status: 'in progress' | 'completed'; // Adjust according to your status types
  time: string; // Change type if needed (e.g., Date or string)
}

const TodoDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3001/todos/${id}`);
          setTodo(response.data);
        } catch (error) {
          console.error(error);
          setError('Failed to fetch todo details.'); // Set error message
        }
      }
    };

    fetchTodo();
  }, [id]);

  if (error) return <p>{error}</p>; // Display error message
  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h2>{todo.name}</h2>
      <p>{todo.description}</p>
      <p>Status: {todo.status}</p>
      <p>Time: {todo.time}</p>
    </div>
  );
};

export default TodoDetails;

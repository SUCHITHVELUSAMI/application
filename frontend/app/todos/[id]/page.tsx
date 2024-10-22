import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Todo {
  id: string;
  name: string;
  description: string;
  status: 'in progress' | 'completed';
  time: string;
}

const TodoDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3001/todos/${id}`);
          setTodo(response.data);
        } catch (error) {
          console.error(error);
          setError('Failed to fetch todo details.');
        }
      }
    };

    fetchTodo();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!todo) return <div className="spinner">Loading...</div>;

  return (
    <div className="todo-container">
      <h2>{todo.name}</h2>
      <p>{todo.description}</p>
      <p>Status: {todo.status}</p>
      <p>Time: {todo.time}</p>
      {/* Additional buttons for editing or deleting can be added here */}
    </div>
  );
};

export default TodoDetails;

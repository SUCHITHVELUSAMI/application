import { useEffect, useState } from 'react';
import { fetchTodos } from '../../services/api';  // Import the API service

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);  // Track the current page
  const [limit] = useState(10);  // Number of todos per page
  const [loading, setLoading] = useState(false);  // Track loading state
  const [error, setError] = useState('');  // Track error messages

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);  // Start loading
      try {
        const response = await fetchTodos(page, limit);
        setTodos(response.data);  // Update the state with fetched todos
      } catch (error) {
        setError('Failed to fetch todos');
      } finally {
        setLoading(false);  // Stop loading
      }
    };
    loadTodos();
  }, [page]);  // Re-fetch todos when the page changes

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Your Todos</h1>
      {loading && <p className="text-blue-500">Loading...</p>}  {/* Show loading indicator */}
      {error && <p className="text-red-500">{error}</p>}  {/* Show error message */}
      <ul className="list-disc pl-5">
        {todos.map(todo => (
          <li key={todo.id} className="my-2">
            <a href={`/todos/${todo.id}`} className="text-blue-500">{todo.name} - {todo.status}</a>
          </li>
        ))}
      </ul>
      <div className="flex justify-between my-4">
        <button className="px-4 py-2 bg-gray-300" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button className="px-4 py-2 bg-blue-500 text-white" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TodosPage;

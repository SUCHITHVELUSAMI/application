"use client";

import React, { useState } from 'react';
import { Todo } from '../../types'; // Adjust the import path as necessary

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => Promise<void>;
  onUpdate: (todo: Todo) => Promise<void>;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  onUpdate,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'in progress'>('all');
  const [loadingTodo, setLoadingTodo] = useState<number | null>(null); // Track loading todo for async operations
  const [error, setError] = useState<string | null>(null); // Error state

  const todosPerPage = 5;

  const handleUpdate = async (todo: Todo) => {
    setLoadingTodo(todo.id);
    setError(null);
    try {
      await onUpdate(todo); // Update the todo
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update todo');
    } finally {
      setLoadingTodo(null); // Reset loading state
    }
  };

  const handleDelete = async (id: number) => {
    setLoadingTodo(id);
    setError(null);
    try {
      await onDelete(id); // Delete the todo
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Failed to delete todo');
    } finally {
      setLoadingTodo(null);
    }
  };

  // Filter todos based on status
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    return filter === 'completed' ? todo.status === 'completed' :
           filter === 'in progress' ? todo.status === 'in progress' :
           todo.status === 'pending';
  });

  // Paginate the todos
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  return (
    <div>
      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter('all')} disabled={filter === 'all'} aria-pressed={filter === 'all'}>
          Show All
        </button>
        <button onClick={() => setFilter('pending')} disabled={filter === 'pending'} aria-pressed={filter === 'pending'}>
          Show Pending
        </button>
        <button onClick={() => setFilter('in progress')} disabled={filter === 'in progress'} aria-pressed={filter === 'in progress'}>
          Show In Progress
        </button>
        <button onClick={() => setFilter('completed')} disabled={filter === 'completed'} aria-pressed={filter === 'completed'}>
          Show Completed
        </button>
      </div>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Todo List */}
      <ul>
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo) => (
            <li key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.description || 'No description provided'}</p>
              <p>Status: {todo.status}</p>
              {todo.status === 'pending' && (
                <button 
                  onClick={() => handleUpdate({ ...todo, status: 'completed' })}
                  disabled={loadingTodo === todo.id}
                >
                  {loadingTodo === todo.id ? 'Updating...' : 'Mark as Completed'}
                </button>
              )}
              {todo.status === 'in progress' && (
                <button 
                  onClick={() => handleUpdate({ ...todo, status: 'completed' })}
                  disabled={loadingTodo === todo.id}
                >
                  {loadingTodo === todo.id ? 'Updating...' : 'Complete'}
                </button>
              )}
              <button 
                onClick={() => handleDelete(todo.id)} 
                disabled={loadingTodo === todo.id}
              >
                {loadingTodo === todo.id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))
        ) : (
          <p>No todos available based on filter.</p>
        )}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;

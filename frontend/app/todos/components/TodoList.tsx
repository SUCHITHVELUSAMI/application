"use client";

import React, { useState } from 'react';
import { Todo } from '../../types'; // Adjust the import path as necessary

// Define props for TodoList component
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
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'in progress'>('all'); // Include 'in progress' in filter
  const todosPerPage = 5; // Adjust this to change the number of todos displayed per page

  // Filtered todos based on status
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

      {/* Todo List */}
      <ul>
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo) => (
            <li key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.description || "No description provided"}</p>
              <p>Status: {todo.status}</p>
              {todo.status === 'pending' && (
                <button onClick={() => onUpdate({ ...todo, status: 'completed' })}>
                  Mark as Completed
                </button>
              )}
              {todo.status === 'in progress' && (
                <button onClick={() => onUpdate({ ...todo, status: 'completed' })}>
                  Complete
                </button>
              )}
              <button onClick={() => onDelete(todo.id)}>Delete</button>
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
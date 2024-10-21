// /frontend/app/todos/components/TodoList.tsx

import React from 'react';

interface Todo {
  id: number;
  name: string;
  description: string;
  status: string; // 'in progress' or 'completed'
  // Add other properties as necessary
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      <h3>Todo Items</h3>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <h4>{todo.name}</h4>
              <p>{todo.description}</p>
              <p>Status: {todo.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

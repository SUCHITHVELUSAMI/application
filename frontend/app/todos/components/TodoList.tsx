import React from 'react';
import Link from 'next/link';

type TodoStatus = 'in progress' | 'completed';

interface Todo {
  id: number;
  name: string;
  description: string;
  status: TodoStatus;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in progress':
        return 'orange';
      default:
        return 'black';
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
            <li key={todo.id}>
              <Link href={`/todos/${todo.id}`}>
                <h4>{todo.name}</h4>
                <p>{todo.description}</p>
                <p style={{ color: getStatusColor(todo.status) }}>
                  Status: {todo.status}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

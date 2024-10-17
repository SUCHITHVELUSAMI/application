// /home/hp/application/frontend/app/todos/page.tsx
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const TodosPage = () => {
  return (
    <div>
      <h1>Your Todos</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodosPage;

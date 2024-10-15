// src/components/TodoList.js

import React from 'react';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => onUpdate(todo)}>Update</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

// src/components/TodoForm.js

import React, { useState } from 'react';

const TodoForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

"use client";  // Mark this as a Client Component

import TodoForm from '../../ components/TodoForm';  // Import the reusable TodoForm component
import { createTodo } from '../../../services/api';  // API function

const CreateTodoPage = () => {
  const onSubmit = async (data: any) => {
    try {
      const response = await createTodo(data);
      console.log('Todo created successfully:', response);
      // Redirect or show success message here (you can use useRouter for redirection)
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <div>
      <h1>Create Todo</h1>
      <TodoForm initialValues={{ name: '', description: '', time: '', status: 'In Progress' }} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateTodoPage;

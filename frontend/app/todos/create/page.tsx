import { useForm } from 'react-hook-form';
import { createTodo } from '../../../services/api';  // Import the API service

const CreateTodoPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Call the API function to create a new todo
      const response = await createTodo(data);
      console.log('Todo created successfully:', response);
      // You can redirect the user to the todos page after successful creation
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <div>
      <h1>Create Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: "Name is required" })} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register("description", { required: "Description is required" })} placeholder="Description" />
        {errors.description && <p>{errors.description.message}</p>}

        <input type="time" {...register("time", { required: "Time is required" })} />
        {errors.time && <p>{errors.time.message}</p>}

        <select {...register("status")}>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTodoPage;

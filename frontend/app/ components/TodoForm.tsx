"use client";  // Mark this as a Client Component

import { useForm } from 'react-hook-form';

interface TodoFormProps {
  initialValues: {
    name: string;
    description: string;
    time: string;
    status: string;
  };
  onSubmit: (data: any) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues,  // Set default values for form fields
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "Name is required" })} placeholder="Name" />
      {errors.name && <p>{String(errors.name.message) || "Error occurred."}</p>}  {/* Cast to string */}

      <input {...register("description", { required: "Description is required" })} placeholder="Description" />
      {errors.description && <p>{String(errors.description.message) || "Error occurred."}</p>}  {/* Cast to string */}

      <input type="time" {...register("time", { required: "Time is required" })} />
      {errors.time && <p>{String(errors.time.message) || "Error occurred."}</p>}  {/* Cast to string */}

      <select {...register("status")}>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;

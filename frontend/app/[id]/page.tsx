"use client";  // Mark this component as a Client Component

import { useParams } from 'next/navigation';  // Correct hook for accessing dynamic params

const TodoDetail = () => {
  const { id } = useParams();  // Retrieve the `id` from the dynamic route

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle status update logic here (API call)
  };

  return (
    <div>
      <h1>Update Todo Status for {id}</h1>
      <form onSubmit={handleSubmit}>
        <select name="status">
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default TodoDetail;

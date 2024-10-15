const CreateTodoPage = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Handle create todo logic here (API call)
    };
  
    return (
      <div>
        <h1>Create Todo</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Description" required />
          <input type="time" required />
          <select name="status">
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    );
  };
  
  export default CreateTodoPage;
  
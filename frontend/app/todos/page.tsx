const TodosPage = () => {
    const todos = [
      { id: 1, name: 'Todo 1', status: 'In Progress' },
      { id: 2, name: 'Todo 2', status: 'Completed' },
    ];
  
    return (
      <div>
        <h1>Your Todos</h1>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <a href={`/todos/${todo.id}`}>{todo.name} - {todo.status}</a>
            </li>
          ))}
        </ul>
        <a href="/todos/create">Create New Todo</a>
      </div>
    );
  };
  
  export default TodosPage;
  
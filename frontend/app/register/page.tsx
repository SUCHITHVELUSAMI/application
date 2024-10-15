const RegisterPage = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Handle registration logic here (API call)
    };
  
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Mobile" required />
          <select name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select name="country" required>
            <option value="India">India</option>
            <option value="SriLanka">Sri Lanka</option>
            <option value="Japan">Japan</option>
          </select>
          <label>Hobbies:</label>
          <input type="checkbox" value="Music" /> Music
          <input type="checkbox" value="Sports" /> Sports
          <input type="checkbox" value="Painting" /> Painting
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default RegisterPage;
  
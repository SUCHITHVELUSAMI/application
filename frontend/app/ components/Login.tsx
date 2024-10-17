// Import necessary modules
import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/api'; // Adjust the import path as needed

// Define the LoginPage component
const LoginPage = () => {
  // Use react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data); // Call the loginUser API
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register("username", { required: "Username is required" })} 
          placeholder="Username" 
        />
        {errors.username && (
          <p>{errors.username.message}</p> // Display error message for username
        )}

        <input 
          type="password" 
          {...register("password", { required: "Password is required" })} 
          placeholder="Password" 
        />
        {errors.password && (
          <p>{errors.password.message}</p> // Display error message for password
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

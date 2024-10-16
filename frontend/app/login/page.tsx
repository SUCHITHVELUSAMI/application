"use client";  // Mark this as a Client Component

import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/api';  // Import the API service
import { useRouter } from 'next/navigation';  // Correct import for App Router navigation

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();  // Correct usage for navigation in App Router

  const onSubmit = async (data: any) => {
    try {
      // Call the API function to log in the user
      const response = await loginUser(data);

      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      console.log('User logged in successfully:', response);
      // Redirect to the todos page after successful login
      router.push('/todos');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("mobile", { required: "Mobile is required" })} placeholder="Mobile" />
        {errors.mobile && <p>{errors.mobile.message}</p>}

        <input type="password" {...register("password", { required: "Password is required" })} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

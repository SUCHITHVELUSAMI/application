"use client";  // Mark this as a Client Component

import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/api';  // Import the API service
import { useRouter } from 'next/navigation';  // Correct for App Router

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem('token', response.data.token);
      console.log('User logged in successfully:', response);
      router.push('/todos');  // Redirect to the todos page
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

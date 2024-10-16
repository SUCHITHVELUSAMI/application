"use client";  // Mark this as a Client Component

import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/api';  // Import the API service

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await registerUser(data);
      console.log('User registered successfully:', response);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: "Name is required" })} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register("mobile", { required: "Mobile is required" })} placeholder="Mobile" />
        {errors.mobile && <p>{errors.mobile.message}</p>}

        <input type="email" {...register("email", { required: "Email is required" })} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" {...register("password", { required: "Password is required" })} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

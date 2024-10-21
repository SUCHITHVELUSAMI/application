// /frontend/app/register/page.tsx
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

// Define the form data structure
interface RegisterFormInputs {
  name: string;
  mobile: string;
  gender: string;
  country: string;
  email: string;
  password: string;
  hobbies?: string[]; // Hobbies can be an optional array
}

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [apiError, setApiError] = useState<string>('');

  // Define the submit handler type
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await axios.post('http://localhost:3001/auth/register', data);
      // Handle success (e.g., redirect to login page or show success message)
    } catch (error: any) {
      setApiError(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {apiError && <p className="error-message">{apiError}</p>}
      
      {/* Name */}
      <input {...register('name', { required: 'Name is required' })} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}
      
      {/* Mobile */}
      <input {...register('mobile', { required: 'Mobile number is required' })} placeholder="Mobile" />
      {errors.mobile && <p>{errors.mobile.message}</p>}
      
      {/* Gender */}
      <select {...register('gender', { required: 'Gender is required' })}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}
      
      {/* Country */}
      <select {...register('country', { required: 'Country is required' })}>
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="SriLanka">SriLanka</option>
        <option value="Japan">Japan</option>
      </select>
      {errors.country && <p>{errors.country.message}</p>}
      
      {/* Email */}
      <input {...register('email', { required: 'Email is required' })} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      
      {/* Password */}
      <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}
      
      {/* Hobbies (Checkboxes) */}
      <div>
        <label>
          <input type="checkbox" {...register('hobbies')} value="Music" /> Music
        </label>
        <label>
          <input type="checkbox" {...register('hobbies')} value="Sports" /> Sports
        </label>
        <label>
          <input type="checkbox" {...register('hobbies')} value="Painting" /> Painting
        </label>
      </div>
      {errors.hobbies && <p>{errors.hobbies.message}</p>}

      {/* Submit Button */}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

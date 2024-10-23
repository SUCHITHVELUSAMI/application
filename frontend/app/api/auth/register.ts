// /frontend/app/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, mobile, gender, country, hobbies, email, password } = req.body;

    try {
      // Update the URL to include /api
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        name,
        mobile,
        gender,
        country,
        hobbies,
        email,
        password,
      });
      res.status(201).json(response.data); // Successfully registered
    } catch (error: any) {
      // Check if there's a response from the server
      if (error.response) {
        // Forward the server's error message
        res.status(error.response.status).json({ message: error.response.data.message || 'Registration failed' });
      } else {
        // Handle network or other errors
        res.status(500).json({ message: 'Network error. Please try again later.' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

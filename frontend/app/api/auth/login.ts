// /frontend/app/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface LoginRequestBody {
  mobile: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { mobile, password }: LoginRequestBody = req.body;

    try {
      // Update the URL to include /api
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { mobile, password });
      res.status(200).json(response.data); // Successfully logged in
    } catch (error: any) {
      console.error('Login error:', error);

      if (error.response) {
        res.status(error.response.status).json({ message: error.response.data.message || 'Login failed' });
      } else {
        res.status(500).json({ message: 'Network error. Please try again later.' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

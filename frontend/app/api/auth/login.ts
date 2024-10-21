// /frontend/app/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { mobile, password } = req.body;

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { mobile, password });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(401).json({ message: 'Login failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

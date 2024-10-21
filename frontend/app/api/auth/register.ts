// /frontend/app/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, mobile, gender, country, hobbies, email, password } = req.body;

    try {
      const response = await axios.post('http://localhost:3001/auth/register', {
        name,
        mobile,
        gender,
        country,
        hobbies,
        email,
        password,
      });
      res.status(201).json(response.data);
    } catch (error) {
      res.status(400).json({ message: 'Registration failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

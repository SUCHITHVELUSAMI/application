import axios from 'axios';

const API_URL = 'http://localhost:3000/api';  // Adjust the URL to match your backend

// Helper function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Register a new user
export const registerUser = async (data: any) => {
  return axios.post(`${API_URL}/register`, data);
};

// Login user
export const loginUser = async (data: any) => {
  return axios.post(`${API_URL}/login`, data);
};

// Create a new todo (with token)
export const createTodo = async (data: any) => {
  const token = getToken();
  return axios.post(`${API_URL}/todos`, data, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in the request header
    }
  });
};

// Fetch all todos (with token)
export const fetchTodos = async () => {
  const token = getToken();
  return axios.get(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in the request header
    }
  });
};

// Update todo status (with token)
export const updateTodoStatus = async (id: string, status: string) => {
  const token = getToken();
  return axios.put(`${API_URL}/todos/${id}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in the request header
    }
  });
};

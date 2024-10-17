import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Fetch from environment variable

// Helper function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Utility function to handle API calls with error handling
const apiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data: any = null) => {
  try {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('API call failed:', error);
    throw error; // Rethrow the error for handling in components
  }
};

// Register a new user
export const registerUser = (data: any) => apiCall('POST', '/users/register', data);

// Login user
export const loginUser = (data: any) => apiCall('POST', '/users/login', data);

// Create a new todo (with token)
export const createTodo = (data: any) => apiCall('POST', '/todos', data);

// Fetch all todos (with token)
export const fetchTodos = () => apiCall('GET', '/todos');

// Fetch todo by ID
export const fetchTodoById = async (id: string) => {
  const token = getToken(); // Get the token from localStorage
  return axios.get(`${API_URL}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}` // Include token in the request header
    }
  });
};

// Update todo status (with token)
export const updateTodoStatus = (id: string, status: string) => apiCall('PUT', `/todos/${id}`, { status });

"use client"; // Ensure this is a client component

import { Todo } from '../types';
import React, { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import TodoForm from './components/TodoForm'; // Adjust this import based on your file structure

const API_BASE_URL = 'http://localhost:3001'; // Corrected port to match your backend

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string | null>(null); // For error handling
    const [loading, setLoading] = useState<boolean>(false); // For loading state
    const router = useRouter(); // Initialize router for navigation

    const fetchTodos = useCallback(async () => {
        setLoading(true); // Set loading to true when fetching todos
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage

            if (!token) {
                console.log('No token found, redirecting to login');
                router.push('/login'); // Redirect to login if token is not found
                return; // Exit early
            }

            const response = await axios.get(`${API_BASE_URL}/todos`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the request headers
                },
            });
            setTodos(response.data); // Assuming response.data is an array of todos
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error fetching todos:', error.message);
                setError(error.message); // Set error message
            } else {
                console.error('Unexpected error:', error);
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false); // Set loading to false after fetch completes
        }
    }, [router]); // Added router as a dependency

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleTodoCreated = async (newTodo: Omit<Todo, 'id'>) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage

            if (!token) {
                console.log('No token found, redirecting to login');
                router.push('/login'); // Redirect to login if token is not found
                return; // Exit early
            }

            const response = await axios.post(`${API_BASE_URL}/todos`, newTodo, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the request headers
                },
            });
            setTodos((prevTodos) => [...prevTodos, response.data]); // Add new todo to the list
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error creating todo:', error.message);
                setError(error.message); // Set error message
            } else {
                console.error('Unexpected error:', error);
                setError('An unexpected error occurred while creating the todo.');
            }
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            {loading && <p>Loading todos...</p>} {/* Display loading state */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error if it exists */}
            <TodoForm onTodoCreated={handleTodoCreated} /> {/* Add TodoForm */}
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <li key={todo.id}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description || 'No description provided'}</p>
                            <p>Status: {todo.status}</p>
                        </li>
                    ))
                ) : (
                    <p>No todos available</p>
                )}
            </ul>
        </div>
    );
};

export default TodoPage;

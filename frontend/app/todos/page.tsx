"use client"; // Ensure this is a client component

import { Todo } from '../types';
import React, { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Corrected port to match your backend

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string | null>(null); // For error handling

    const fetchTodos = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/todos`);
            setTodos(response.data); // Assuming response.data is an array of todos
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error fetching todos:', error.message);
                setError(error.message); // Set error message
            } else {
                console.error('Unexpected error:', error);
                setError('An unexpected error occurred.');
            }
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div>
            <h1>Todo List</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error if it exists */}
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

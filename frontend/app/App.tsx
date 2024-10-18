"use client"; // Ensure this is a client component

import React, { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import TodoList from './todos/components/TodoList';
import TodoForm from './todos/components/TodoForm';
import ProtectedRoute from './todos/components/ProtectedRoute';
import { useRouter } from 'next/router';
import { Todo } from './types';

const API_BASE_URL = 'http://localhost:3000';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    const fetchTodos = useCallback(async () => {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/todos?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos(response.data.todos);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            handleError(err as AxiosError<{ message: string }>, 'Failed to fetch todos.'); // Specify the error type
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchTodos();
        }
    }, [router, fetchTodos]);

    const handleCreate = async (newTodo: Omit<Todo, 'id'>) => {
        setError('');
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${API_BASE_URL}/todos`, newTodo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos((prevTodos) => [...prevTodos, { ...response.data, id: response.data.id }]);
        } catch (err) {
            handleError(err as AxiosError<{ message: string }>, 'Failed to create todo.');
        }
    };

    const handleDelete = async (id: number) => {
        setError('');
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_BASE_URL}/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        } catch (err) {
            handleError(err as AxiosError<{ message: string }>, 'Failed to delete todo.');
        }
    };

    const handleUpdate = async (todo: Todo) => {
        const updatedTodo: Todo = {
            ...todo,
            status: todo.status === 'pending' ? 'completed' : 'pending',
        };
        setError('');
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${API_BASE_URL}/todos/${todo.id}`, updatedTodo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos((prevTodos) =>
                prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
            );
        } catch (err) {
            handleError(err as AxiosError<{ message: string }>, 'Failed to update todo.');
        }
    };

    const handleError = (err: AxiosError<{ message: string }>, defaultMessage: string) => {
        const errorMessage = err.response?.data?.message || defaultMessage; // Now it correctly recognizes message
        setError(errorMessage);
        console.error(errorMessage);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold my-4">Todo Application</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p className="text-red-500">{error}</p>}
                    <TodoForm onTodoCreated={handleCreate} />
                    <ProtectedRoute onLogout={handleLogout}> {/* Pass onLogout to ProtectedRoute */}
                        <TodoList
                            todos={todos}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </ProtectedRoute>
                </>
            )}
        </div>
    );
};

export default App;

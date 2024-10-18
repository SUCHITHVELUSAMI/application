"use client"; // Ensure this is a client component

import React, { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import ProtectedRoute from './components/ProtectedRoute';
import { useRouter } from 'next/navigation'; // Ensure you import from 'next/navigation'

// Define the Todo interface
interface Todo {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'completed' | 'in progress';
}

// Define the structure of the error response
interface ErrorResponse {
    message: string;
}

const API_BASE_URL = 'http://localhost:3000';

const TodosPage: React.FC = () => {
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
            handleError(err as AxiosError<ErrorResponse>, 'Failed to fetch todos.');
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleError = (error: AxiosError<ErrorResponse>, defaultMessage: string) => {
        const message = error.response?.data?.message || defaultMessage;
        setError(message);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    // Handler functions for creating, updating, and deleting todos
    const handleCreate = async (newTodo: Omit<Todo, 'id'>) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/todos`, newTodo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos((prev) => [...prev, response.data]);
        } catch (error) {
            handleError(error as AxiosError<ErrorResponse>, 'Failed to create todo.');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE_URL}/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (error) {
            handleError(error as AxiosError<ErrorResponse>, 'Failed to delete todo.');
        }
    };

    const handleUpdate = async (updatedTodo: Todo) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_BASE_URL}/todos/${updatedTodo.id}`, updatedTodo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? response.data : todo)));
        } catch (error) {
            handleError(error as AxiosError<ErrorResponse>, 'Failed to update todo.');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchTodos(); // Fetch todos when the page changes
    };

    return (
        <ProtectedRoute onLogout={handleLogout}>
            <h1>Your Todos</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <TodoForm onTodoCreated={handleCreate} />
                    <TodoList 
                        todos={todos} 
                        onDelete={handleDelete} 
                        onUpdate={handleUpdate} 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </ProtectedRoute>
    );
};

export default TodosPage;

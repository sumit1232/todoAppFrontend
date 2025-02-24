// src/components/Todo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await axios.get('https://todoappbackend-x01h.onrender.com/api/todos');
        setTodos(res.data);
    };

    const addTodo = async () => {
        if (!task) return;

        const res = await axios.post('https://todoappbackend-x01h.onrender.com/api/todos', { task });
        setTodos([...todos, res.data]);
        setTask('');
    };

    const toggleComplete = async (id) => {
        const todo = todos.find(todo => todo._id === id);
        const res = await axios.put(`https://todoappbackend-x01h.onrender.com/api/todos/${id}`, { completed: !todo.completed });
        setTodos(todos.map(t => t._id === id ? res.data : t));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`https://todoappbackend-x01h.onrender.com/api/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleComplete(todo._id)}
                        >
                            {todo.task}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;

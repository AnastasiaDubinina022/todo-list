import { useState, useEffect } from 'react';
import type { Todo } from './types/todo';
import { loadTodos, saveTodos } from "./utils/localStorage";

import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import Filters from "./components/Filters/Filters";

import "./styles/main.scss";

type Filter = 'all' | 'active' | 'completed';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter]= useState<Filter>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos((prev) => [ ...prev, newTodo]);
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) => 
      prev.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo));
  }
  
  const filterMap: Record<Filter, (todo: Todo) => boolean> = {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
  };

  const filteredTodos = todos.filter(filterMap[filter]);

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <Filters current={filter} onChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
      <p className="counter">{activeCount} tasks left</p>
    </div>
  );
}




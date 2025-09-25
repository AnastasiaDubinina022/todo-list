import { useState } from "react";
import "./TodoForm.scss";

interface TodoFormProps {
    onAddTodo: (todoText: string) => void;
}

export default function TodoForm ({ onAddTodo }: TodoFormProps) {
    const [todoText, setTodoText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (todoText.trim()) {
            onAddTodo(todoText.trim());
            setTodoText("");
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <label htmlFor="todo-input" className="visually-hidden">
                New Todo
            </label>
            <input
                id="todo-input"
                name="todo"
                className="input todo-form__input"
                type="text"
                value = {todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Enter a new todo"  
            />
            <button className="button todo-form__button" type="submit">
                Add Todo
            </button>
        </form>
    )
}
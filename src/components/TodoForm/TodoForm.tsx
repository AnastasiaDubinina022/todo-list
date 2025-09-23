import { useState } from "react";
import styles from "./TodoForm.module.scss";

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
        <form className={styles.todoForm} onSubmit={handleSubmit}>
            <input 
              className={styles.input}
              value = {todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Enter a new todo"  
            />
            <button className={styles.button} type="submit">
                Add Todo
            </button>
        </form>
    )
}
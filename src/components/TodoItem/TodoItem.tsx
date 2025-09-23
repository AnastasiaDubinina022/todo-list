import { useState } from "react";
import type { Todo } from "../../types/todo";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({todo, onToggle, onDelete, onEdit}: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    const handleSave = () => {
        if (text.trim()) {
            onEdit(todo.id, text.trim());
            setIsEditing(false);
        }
    }

    return (
        <li className={styles.item}>
            <input className={styles.checkbox}
            type="checkbox" 
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
        />

        {isEditing ? (
            <input
                className={styles.editInput}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus   
            />
            ) : (
            <span
                className={`${styles.text} ${todo.completed ? styles.completed : ""}`}
                onDoubleClick={() => setIsEditing(true)}
            >
            {todo.text}
            </span>
            )}

            <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>
                ✕
            </button>
        </li>
    );

}

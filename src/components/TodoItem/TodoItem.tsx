import { useState } from "react";
import type { Todo } from "../../types/todo";
import "./TodoItem.scss";

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
        <li className="todo-list__item">
                <input className="todo-list__checkbox"
                type="checkbox" 
                id={`todo-${todo.id}`}
                name="completed"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />

        {isEditing ? (
            <input
                className="todo-list__editInput"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus   
            />
            ) : (
            <span
                className={`todo-list__text ${todo.completed ? "todo-list__completed" : ""}`}
                onDoubleClick={() => setIsEditing(true)}
            >
            {todo.text}
            </span>
            )}

            <button className="button__delete" onClick={() => onDelete(todo.id)}>
                <span>
                    ✕
                </span>
            </button>
        </li>
    );

}

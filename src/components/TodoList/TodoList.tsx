import type { Todo } from "../../types/todo";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete(id: string): void;
    onEdit(id: string, newext: string): void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
    if (todos.length === 0) {
        return <p className={styles.empty}>No todos available</p>;
    }

    return (
        <ul className={styles.list}>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}
import React from "react";
import styles from "./App.module.css";
import { TodoInterface } from "./TodoInterface";

interface TodoRowProps {
  todo: TodoInterface;
  updateTodoId: number | null;
  updatedTodoTitle: string | undefined;
  setUpdatedTodoTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TitleColumn: React.FC<TodoRowProps> = ({
  todo,
  updateTodoId,
  updatedTodoTitle,
  setUpdatedTodoTitle,
}) => {
  return (
    <div>
      {todo.id === updateTodoId ? (
        <input
          className={styles.upS}
          type="text"
          placeholder="Update here..."
          value={updatedTodoTitle}
          onChange={(e) => setUpdatedTodoTitle(e.target.value)}
        />
      ) : (
        <td className={styles.titles}>{todo.title}</td>
      )}
    </div>
  );
};
export default TitleColumn;
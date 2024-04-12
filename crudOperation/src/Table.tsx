import React from "react";
import styles from "./App.module.css";
import { TodoInterface } from "./TodoInterface";
import TodoRow from "./TodoRow";

interface TableProps {
  todos: TodoInterface[];
  updateTodoId: number | null;
  updatedTodoTitle: string | undefined;
  setUpdatedTodoTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUpdateTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  deleteTodo: (id: number) => void;
  updateTodo: () => void;
}

const Table: React.FC<TableProps> = ({
  todos,
  updateTodoId,
  updatedTodoTitle,
  setUpdatedTodoTitle,
  setUpdateTodoId,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <table>
      <thead className={styles.tabhead}>
        <tr>
          <th>Titles</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <TodoRow
          todos={todos}
          updateTodoId={updateTodoId}
          updatedTodoTitle={updatedTodoTitle}
          setUpdatedTodoTitle={setUpdatedTodoTitle}
          setUpdateTodoId={setUpdateTodoId}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </tbody>
    </table>
  );
};
export default Table;
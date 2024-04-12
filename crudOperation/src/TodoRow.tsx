import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBookmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./App.module.css";
import { TodoInterface } from "./TodoInterface";
import TitleColumn from "./TitleColumn";

interface TodoRowProps {
  todos: TodoInterface[];
  updateTodoId: number | null;
  updatedTodoTitle: string | undefined;
  setUpdatedTodoTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUpdateTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  deleteTodo: (id: number) => void;
  updateTodo: () => void;
}

const TodoRow: React.FC<TodoRowProps> = ({
  todos,
  updateTodoId,
  updatedTodoTitle,
  setUpdatedTodoTitle,
  setUpdateTodoId,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <>
      {todos.map((todo) => (
        <tr className={styles.tbody} key={todo.id}>
          <TitleColumn
            key={todo.id}
            todo={todo}
            updateTodoId={updateTodoId}
            updatedTodoTitle={updatedTodoTitle}
            setUpdatedTodoTitle={setUpdatedTodoTitle}
          />
          <td>
            {todo.id === updateTodoId ? (
              <FontAwesomeIcon
                className={styles.save_button}
                onClick={updateTodo}
                icon={faBookmark}
              />
            ) : (
              <FontAwesomeIcon
                icon={faPen}
                className={styles.up_button}
                onClick={() => setUpdateTodoId(todo.id)}
              />
            )}
          </td>
          <td>
            <FontAwesomeIcon
              icon={faTrash}
              className={styles.del_button}
              onClick={() => deleteTodo(todo.id)}
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoRow;
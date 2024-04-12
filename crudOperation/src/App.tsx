import React, { useState, useEffect, useDeferredValue } from "react";
import axios from "axios";
import styles from "./App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
import { TodoInterface } from "./TodoInterface";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string | undefined>("");
  const [updateTodoId, setUpdateTodoId] = useState<number | null>(null);
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState<string | undefined>(
    ""
  );
  const [searchTodo, setSearchTodo] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  // useDeferredValue
  const deferredUpdatedTodoTitle = useDeferredValue(updatedTodoTitle);
  const deferredNewTodoTitle = useDeferredValue(newTodoTitle);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: deferredNewTodoTitle,
        }
      );
      if (deferredNewTodoTitle) {
        setTodos([...todos, response.data]);
        setNewTodoTitle("");
        alert("Title added successfully");
      } else {
        alert("Title can't be empty");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async () => {
    try {
      if (updateTodoId !== null) {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${updateTodoId}`,
          {
            id: updateTodoId,
            title: deferredUpdatedTodoTitle,
          }
        );
        const updatedTodos = todos.map((todo) => {
          if (todo.id === updateTodoId) {
            if (deferredUpdatedTodoTitle) {
              return response.data;
            } else {
              alert("title can't be empty");
            }
          }
          return todo;
        });
        setTodos(updatedTodos);
        setUpdateTodoId(null);
        setUpdatedTodoTitle("");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTodo.toLowerCase())
  );

  return (
    <div className={styles.body}>
      <nav className={styles.navbar}>
        <div>
          <h1 className={styles.heading}>CRUD Operations</h1>
        </div>
        <div className={styles.input_container}>
          <div className={styles.SeaCol}>
            <input
              className={styles.Searching}
              placeholder="Search here..."
              type="text"
              value={searchTodo}
              onChange={(e) => setSearchTodo(e.target.value)}
            />
            <FontAwesomeIcon
              className={styles.SButton}
              icon={faMagnifyingGlass}
            />
          </div>
          <div className={styles.AddCol}>
            <input
              className={styles.Adding}
              type="Add"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Add here..."
            />
            <FontAwesomeIcon
              className={styles.AButton}
              onClick={addTodo}
              icon={faCheck}
            />
          </div>
        </div>
      </nav>
      <br />
      <div>
        <p>this data is fetched from the API.</p>
      </div>
      <br />
      <Table
        todos={filteredTodos}
        updateTodoId={updateTodoId}
        updatedTodoTitle={updatedTodoTitle}
        setUpdatedTodoTitle={setUpdatedTodoTitle}
        setUpdateTodoId={setUpdateTodoId}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default Todos;

import React, { useState, useEffect, useReducer } from "react";
import TodoList from "./TodoList";
import { Context } from "./context";
import reducer from "./reducer";

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos"))
  );
  // const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

  //componentDidMount(){}
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
    return;
  }, [state]);

  const addTodo = event => {
    if (event.key === "Enter") {
      dispatch({
        type: "ADD_TODO",
        payload: todoTitle
      });

      setTodoTitle("");
    }
  };
  // state = {
  //   todos: [
  //     {id: 1, title: 'First todo', completed: false},
  //     {id: 2, title: 'Second todo', completed: true},
  //   ]
  // }

  // render() {
  return (
    <Context.Provider value={{ dispatch }}>
      <div className="container">
        <h1>Todo app</h1>

        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
            onKeyPress={addTodo}
          />
          <label>Todo name</label>
        </div>

        <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
  // }
}

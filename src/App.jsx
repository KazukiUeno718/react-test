import "./styles.css";
import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { ImcompleteTodo } from "./components/ImcompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [imcompleteTodos, setImcompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...imcompleteTodos, todoText];
    setImcompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodo = [...imcompleteTodos];
    newTodo.splice(index, 1);
    setImcompleteTodos(newTodo);
  };
  const onClickComplete = (index) => {
    const newImcompleteTodo = [...imcompleteTodos];
    newImcompleteTodo.splice(index, 1);
    const newCompleteTodo = [...completeTodos, imcompleteTodos[index]];
    setImcompleteTodos(newImcompleteTodo);
    setCompleteTodos(newCompleteTodo);
  };
  const onClickBack = (index) => {
    const newCompleteTodo = [...completeTodos];
    newCompleteTodo.splice(index, 1);
    const newImcompleteTodo = [...imcompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodo);
    setImcompleteTodos(newImcompleteTodo);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={imcompleteTodos.length >= 5}
      />
      {imcompleteTodos.length >= 5 && <p style={{ color: "red" }}>max 5</p>}
      <ImcompleteTodo
        imcompleteTodos={imcompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo completeTodos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

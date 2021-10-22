import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./Todo.model";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "t1", title: "Finish the course" },
    { id: "t2", title: "Finish the course 2" },
  ]);
  const addNewTodo = (title: string) => {
    const todo = {
      id: Math.random().toString(),
      title,
    };
    setTodos((prevState) => [...prevState, todo]);
  };
  const removeTodo = (id: string) =>
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  return (
    <div className="App">
      <NewTodo onAddTodo={addNewTodo} />
      <TodoList items={todos} onRemoveTodo={removeTodo} />
    </div>
  );
}

export default App;

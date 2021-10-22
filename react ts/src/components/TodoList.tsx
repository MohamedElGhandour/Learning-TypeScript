import React from "react";
import { Todo } from "../Todo.model";
import "./TodoList.css";

interface TodoListProps {
  items: Todo[];
  onRemoveTodo: (id: string) => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button
            // onClick={props.onRemoveTodo.bind(null, todo.id)}
            onClick={() => props.onRemoveTodo(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

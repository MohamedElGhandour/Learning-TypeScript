import { RequestHandler } from "express";
import { Todo } from "../models/todo";
import path from "path";
import fs from "fs";

const fetchTodos: () => Todo[] = () => {
  const url = path.resolve(__dirname, "../db/todos.json");
  try {
    const file = fs.readFileSync(url, "utf8");
    const data: Todo[] = JSON.parse(file.toString());
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const pushToTodos = (newTodo: Todo) => {
  const url = path.resolve(__dirname, "../db/todos.json");
  try {
    const file = fs.readFileSync(url, "utf8");
    const data: Todo[] = JSON.parse(file.toString());
    data.push(newTodo);
    const writeableData = JSON.stringify(data);
    fs.writeFileSync(url, writeableData, "utf-8");
  } catch (error) {
    console.log(error);
  }
};

const saveTodos = (todos: Todo[]) => {
  const url = path.resolve(__dirname, "../db/todos.json");
  try {
    const writeableData = JSON.stringify(todos);
    fs.writeFileSync(url, writeableData, "utf-8");
  } catch (error) {
    console.log(error);
  }
};

export const createTodo: RequestHandler = (req, res) => {
  const title = (req.body as { title: string }).title;
  const newTodo = new Todo(title, Math.random().toString());
  try {
    pushToTodos(newTodo);
    res.status(201).json({ message: "TODO is Created!", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "An Error Occurred!", error });
  }
};

export const getTodos: RequestHandler = (_req, res) => {
  try {
    const TODOS = fetchTodos();
    res.status(200).json({ message: "TODOs", todos: TODOS });
  } catch (error) {
    res.status(500).json({ message: "An Error Occurred!", error });
  }
};

export const editTodo: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;
  const newTitle = (req.body as { title: string }).title;
  try {
    const TODOS = fetchTodos();
    const isExist = TODOS.find((todo) => todo.id === id);
    if (!isExist) return res.status(404).json({ message: "Not Found" });
    TODOS.some((todo) => {
      if (todo.id === id) {
        todo.title = newTitle;
        return;
      }
    });
    saveTodos(TODOS);
    isExist.title = newTitle;
    return res
      .status(200)
      .json({ message: "The TODO is Updated", newTodo: isExist });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occurred!", error });
  }
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;
  try {
    const TODOS = fetchTodos();
    const isExist = TODOS.find((todo) => todo.id === id);
    if (!isExist) return res.status(404).json({ message: "Not Found" });
    const newTODOS = TODOS.filter((todo) => todo.id !== id);
    saveTodos(newTODOS);
    return res
      .status(200)
      .json({ message: "The TODO is Deleted", deletedTodo: isExist });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occurred!", error });
  }
};

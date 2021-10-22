"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.editTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fetchTodos = () => {
    const url = path_1.default.resolve(__dirname, "../db/todos.json");
    try {
        const file = fs_1.default.readFileSync(url, "utf8");
        const data = JSON.parse(file.toString());
        return data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
const pushToTodos = (newTodo) => {
    const url = path_1.default.resolve(__dirname, "../db/todos.json");
    try {
        const file = fs_1.default.readFileSync(url, "utf8");
        const data = JSON.parse(file.toString());
        data.push(newTodo);
        const writeableData = JSON.stringify(data);
        fs_1.default.writeFileSync(url, writeableData, "utf-8");
    }
    catch (error) {
        console.log(error);
    }
};
const saveTodos = (todos) => {
    const url = path_1.default.resolve(__dirname, "../db/todos.json");
    try {
        const writeableData = JSON.stringify(todos);
        fs_1.default.writeFileSync(url, writeableData, "utf-8");
    }
    catch (error) {
        console.log(error);
    }
};
const createTodo = (req, res) => {
    const title = req.body.title;
    const newTodo = new todo_1.Todo(title, Math.random().toString());
    try {
        pushToTodos(newTodo);
        res.status(201).json({ message: "TODO is Created!", todo: newTodo });
    }
    catch (error) {
        res.status(500).json({ message: "An Error Occurred!", error });
    }
};
exports.createTodo = createTodo;
const getTodos = (_req, res) => {
    try {
        const TODOS = fetchTodos();
        res.status(200).json({ message: "TODOs", todos: TODOS });
    }
    catch (error) {
        res.status(500).json({ message: "An Error Occurred!", error });
    }
};
exports.getTodos = getTodos;
const editTodo = (req, res) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    try {
        const TODOS = fetchTodos();
        const isExist = TODOS.find((todo) => todo.id === id);
        if (!isExist)
            return res.status(404).json({ message: "Not Found" });
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
    }
    catch (error) {
        return res.status(500).json({ message: "An Error Occurred!", error });
    }
};
exports.editTodo = editTodo;
const deleteTodo = (req, res) => {
    const id = req.params.id;
    try {
        const TODOS = fetchTodos();
        const isExist = TODOS.find((todo) => todo.id === id);
        if (!isExist)
            return res.status(404).json({ message: "Not Found" });
        const newTODOS = TODOS.filter((todo) => todo.id !== id);
        saveTodos(newTODOS);
        return res
            .status(200)
            .json({ message: "The TODO is Deleted", deletedTodo: isExist });
    }
    catch (error) {
        return res.status(500).json({ message: "An Error Occurred!", error });
    }
};
exports.deleteTodo = deleteTodo;

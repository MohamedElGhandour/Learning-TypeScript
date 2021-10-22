import React, {
  // useState, useEffect
  useRef,
} from "react";
import "./NewTodo.css";

interface NewTodoProps {
  onAddTodo: (todo: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  //   const [value, setVAlue] = useState("");
  const inputTodoElement = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const title = inputTodoElement.current!.value;
    props.onAddTodo(title);
  };
  return (
    <div style={{ margin: "10px" }}>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label>Add New Todo</label>
          <input
            type="text"
            // value={value}
            // onChange={(event) => setVAlue(event.target.value)}
            ref={inputTodoElement}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default NewTodo;

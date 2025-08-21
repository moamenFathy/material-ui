import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "./contexts/TodosContext";

const initialTodos = [
  {
    id: uuidv4(),
    title: "First Task",
    details: "First Task Details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Second Task",
    details: "Seconde Task Details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Third Task",
    details: "Third Task Details",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#191b1f",
          minHeight: "100vh",
        }}
      >
        <TodoList />
      </div>
    </TodosContext.Provider>
  );
}

export default App;

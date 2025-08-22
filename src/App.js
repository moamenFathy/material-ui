import { useEffect, useState } from "react";
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
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      // Check localStorage first
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
        return;
      }

      // If no localStorage, fetch from API
      const response = await fetch("http://localhost:5175/api/Task");
      const data = await response.json();
      setTodos(data);
      localStorage.setItem("todos", JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    // setTodos(storedTodos);
  }, []);

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

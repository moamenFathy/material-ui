import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#191b1f",
        height: "100vh",
      }}
    >
      <TodoList />
    </div>
  );
}

export default App;

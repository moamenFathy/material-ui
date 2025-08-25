import "./App.css";
import TodoList from "./components/TodoList";
import TodosProvider from "./contexts/TodosContext";

function App() {
  return (
    <TodosProvider>
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
    </TodosProvider>
  );
}

export default App;

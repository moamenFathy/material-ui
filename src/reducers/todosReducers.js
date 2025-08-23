import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        description: "",
        isCompleted: false,
      };
      const updatedTodos = [...(currentTodos || []), newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = (currentTodos || []).filter(
        (todo) => todo.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updated": {
      if (action.payload.updatedTodo.title === "") return currentTodos;
      const updatedTodos = (currentTodos || []).map((t) => {
        return t.id === action.payload.id
          ? {
              ...t,
              title: action.payload.updatedTodo.title,
              description: action.payload.updatedTodo.description,
            }
          : t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "toggled": {
      const updatedTodos = (currentTodos || []).map((t) => {
        return t.id === action.payload.id
          ? { ...t, isCompleted: !t.isCompleted }
          : t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storedTodos;
    }

    default: {
      throw new Error("Unknown Type" + action.type);
    }
  }
}

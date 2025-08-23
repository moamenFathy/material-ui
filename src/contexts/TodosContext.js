import { createContext, useReducer } from "react";
import todosReducer from "../reducers/todosReducers";

export const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;

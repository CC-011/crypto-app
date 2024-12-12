"use client";
import StoreProvider from "./StoreProvided";
import { useAppSelector, useAppDispatch } from "./lib/hooks";
import { addTodo, toggleTodo, deleteTodo } from "./lib/features/todo";

const List = () => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        onClick={() =>
          dispatch(addTodo("New Task"))
        }
      >
        Add stuff
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.completed ? "Done" : "Pending"}
            </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home = () => (
  <StoreProvider>
    <List />
  </StoreProvider>
);

export default Home;

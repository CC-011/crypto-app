"use client";
import StoreProvider from "./StoreProvided";
import { useAppSelector, useAppDispatch } from "./lib/hooks";
import { addTodo, toggleTodo, deleteTodo } from "./lib/features/todo";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserData } from "./lib/features/coins";
import { RootState } from "./lib/store";

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
      <button onClick={() => dispatch(fetchUserData())}>Fetch Users</button>
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

const UserComponent = () => {
  const dispatch = useAppDispatch(); // Use your typed dispatch
  const { data, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserData()); // Call the thunk as a function
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data ? (
        <div>
          <div>User Data:</div>
          <div>{JSON.stringify(data, null, 2)}</div>
        </div>
      ) : (
        <div>No user data found.</div>
      )}
    </div>
  );
};

const Home = () => (
  <StoreProvider>
    <List />
    <UserComponent />
  </StoreProvider>
);

export default Home;
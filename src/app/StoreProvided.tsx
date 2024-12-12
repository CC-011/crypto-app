"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./lib/store";

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storeRef = useRef(store); // Use the directly imported store

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;

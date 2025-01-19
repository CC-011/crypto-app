"use client";
import { useAppDispatch } from "../lib/hooks";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchUserData } from "../lib/features/coins";
import { RootState } from "../lib/store";
import StoreProvider from "../StoreProvided";

 function Page() {
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
  }
  
  const coinList = () => {
    <StoreProvider>
    <Page />
    </StoreProvider>;
  };
  
  export default coinList;
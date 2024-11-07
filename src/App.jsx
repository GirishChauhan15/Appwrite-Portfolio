import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import "./App.css";

function App() {
  
  const dispatch = useDispatch();
  
  async function getUser() {
    try {
      const session = await authService.getCurrentUser();
      if (session) {
        dispatch(login(session));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;

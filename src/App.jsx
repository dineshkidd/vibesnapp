import './App.css'
import React from "react";
import AppRouter from "./router";
import {useAuthStore} from "./stores/authStore";
import { useEffect } from "react";

const App = () => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth(); // Initialize Firebase auth listener
  }, [initAuth]);
  return <AppRouter />;
};

export default App;


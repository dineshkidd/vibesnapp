import './App.css'
import React from "react";
import AppRouter from "./router";
import {useAuthStore} from "./stores/authStore";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth(); // Initialize Firebase auth listener
  }, [initAuth]);
  return <QueryClientProvider client={queryClient}>
    <AppRouter />
  </QueryClientProvider>;
};

export default App;


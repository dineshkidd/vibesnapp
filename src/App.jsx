import './App.css'
import React from "react";
import AppRouter from "./router";
import {useAuthStore} from "./stores/authStore";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const App = () => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth(); 
  }, [initAuth]);
  return <QueryClientProvider client={queryClient}>
    <AppRouter />
    <Analytics />
  </QueryClientProvider>;
};

export default App;


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { BASE_API_URL } from "./config/index.ts";
import { UserContextProvider } from "./context/UserContext.tsx";

axios.defaults.baseURL = BASE_API_URL;
console.log(BASE_API_URL);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

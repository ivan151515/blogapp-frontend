import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from "axios"
import { QueryClient, QueryClientProvider } from 'react-query'
import { BASE_API_URL } from './config/index.ts'

axios.defaults.baseURL = BASE_API_URL;
console.log(BASE_API_URL);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)

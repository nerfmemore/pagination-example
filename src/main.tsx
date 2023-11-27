import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from "./components/GlobalStyle"
import App from './App.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'
import SinglePost from './components/SinglePost.tsx'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: 'post/:id',
    element: <SinglePost />,
  }
])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  </React.StrictMode>,
)

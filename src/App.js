import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SetAvatar from "./pages/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter(
  [
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/setAvatar", element: <SetAvatar /> },
    { path: "/", element: <Chat /> },
  ],
  {
    future: {
      v7_startTransition: true, // Already enabled
      v7_relativeSplatPath: true, // Already enabled
      v7_skipActionErrorRevalidation: true, // For action errors
      v7_partialHydration: true, // Add this for hydration behavior
    },
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}

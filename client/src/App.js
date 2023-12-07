import "./App.css";

import {

  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "./components/sidebar";
import { Factory } from "./components/factory";
import AuthForm from "./components/AuthForm";
import { Register } from "./components/register";
const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    const savedUser = localStorage.getItem("token");
    if (!savedUser) {
      navigate("/login", { state: { path: location.pathname } });
    }
  }, [navigate]);
  if (!localStorage.getItem("token")) return null;

  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>{<Factory />}</ProtectedRoute>,
  },
  {
    path: "/login",
    element: <AuthForm></AuthForm>,
  },
  {
    path: "/Register",
    element: <Register></Register>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;



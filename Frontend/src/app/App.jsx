import "./App.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hook/useAuth";
import { useSelector } from "react-redux";

const App = () => {
  const { handleGetMe } = useAuth();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    handleGetMe();
  }, []);

  return <RouterProvider router={routes} />;
};

export default App;

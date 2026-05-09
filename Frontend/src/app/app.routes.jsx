import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/product/pages/CreateProduct";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/product/pages/Dashboard";
import SellerProductDetail from "../features/product/pages/SellerProductDetail";
import Home from "../features/product/pages/Home";
import ProductDetail from "../features/product/pages/ProductDetail";
import MainLayout from "../components/layout/MainLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/seller/create-product",
        element: (
          <Protected role="seller">
            <CreateProduct />
          </Protected>
        ),
      },
      {
        path: "/seller/dashboard",
        element: (
          <Protected role="seller">
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "/seller/product/:productId/detail",
        element: (
          <Protected role="seller">
            <SellerProductDetail />
          </Protected>
        ),
      },
      {
        path: "/product/:productId/detail",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

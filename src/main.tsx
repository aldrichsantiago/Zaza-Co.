import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Root from './routes/Root.tsx';
import ErrorPage from './ErrorPage.tsx';
import Home from './components/pages/Home.tsx';
import ProductPage from './components/pages/ProductPage.tsx';
import '@smastrom/react-rating/style.css'
import CategoryPage from './components/pages/CategoryPage.tsx';
import Login from './components/pages/Login.tsx';
import Register from './components/pages/Register.tsx';
import DealsPage from './components/pages/DealsPage.tsx';
import NewProductsPage from './components/pages/NewProductsPage.tsx';
import AdminRoot from './routes/AdminRoot.tsx';
import { AuthProvider } from './contexts/AuthProvider.tsx';
import axios from 'axios';
import Orders from './components/pages/Orders.tsx';
import RequireAuth from './components/pages/RequireAuth.tsx';
import Wishlist from './components/pages/Wishlist.tsx';
import Dashboard from './components/admin/Dashboard.tsx';
import Analytics from './components/admin/Analytics.tsx';
import Logs from './components/admin/Logs.tsx';
import Users from './components/admin/Users.tsx';
import Settings from './components/admin/Settings.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },{
        path: "/login",
        element: <Login/>
      },{
        path: "/register",
        element: <Register/>
      },{
        path: "products/:productId",
        element: <ProductPage/>
      },{
        path: "category/:categoryName",
        element: <CategoryPage/>
      },{
        path: "/deals",
        element: <DealsPage/>
      },{
        path: "/new-products",
        element: <NewProductsPage/>
      },{
        path: "",
        element: <RequireAuth allowedRoles={["client", "admin"]}/>,
        children: [
          {
            path: "/orders",
            element: <Orders/>
          },{
            path: "/wishlist",
            element: <Wishlist/>
          },
        ]
      },
    ]},
    {
    path: "/admin",
    element: <AdminRoot/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>,
      },
      {
        path: "analytics",
        element: <Analytics/>,
      },
      {
        path: "logs",
        element: <Logs/>,
      },
      {
        path: "users",
        element: <Users/>,
      },
      {
        path: "settings",
        element: <Settings/>,
      },
    ]
  }
]);

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

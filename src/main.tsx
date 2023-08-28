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
      }
    ]
  },{
    path: "/admin",
    element: <AdminRoot/>,
    errorElement: <ErrorPage/>,
    children: [

    ]
  },

]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

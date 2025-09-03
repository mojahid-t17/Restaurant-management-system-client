import {
  createBrowserRouter
} from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";

import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AllUsers from "../pages/Dashboard/Allusers/AllUsers";
import Cart from "../pages/Dashboard/Cart/Cart";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import FoodOrder from "../pages/FoodOrder/FoodOrder";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path: '/menu',
          element:<Menu></Menu>
        },
        {
          path:'/order/:category',
          element:<FoodOrder></FoodOrder>
        },
        {
          path:'/signIn',
          element:<SignIn></SignIn>
        },
       {
        path:'/signUp',
        element:<SignUp></SignUp>
       }
    ]
  },
  {
    path:'dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:'cart',
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      },

      // admin routes
      {
        path: "allUsers",
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:"addItems",
        element:<AdminRoute><AddItems></AddItems></AdminRoute>
      },
    {
      path:"manageItems",
      element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
    },
    {
      path:"updateItem/:id",
      element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
       loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
    }
    ]
  }
]);
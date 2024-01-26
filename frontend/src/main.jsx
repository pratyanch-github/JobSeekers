import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import UsersList from './components/UsersList.jsx';
import ProfileView from './components/ProfileView.jsx';



let appLayout =  createBrowserRouter([
    
  {
     path: "/",
     element: <App></App>,
     children: [ 
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "signup",
        element: <Signup/>,
      },
      {
        path: "/",
        element: <UsersList/>,
      },
      {
        path: "profile/:id",
        element: <ProfileView/>,
      },
     ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider  router={appLayout}></RouterProvider>
)

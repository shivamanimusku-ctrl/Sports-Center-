import { createBrowserRouter, Navigate } from "react-router-dom";


import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layouts/account";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
// import News from "../pages/news";
import Logout from "../pages/logout";
import Dashboard from "../pages/dashboard"; // Import the Dashboard component
import NewsDetail from "../pages/news/Newsdetail";
import Matches from "../pages/matches";
import MatchDetail from "../pages/matches/MatchDetail";
import NotFound from "../pages/NotFound";
// import Preferences from "../pages/preferences";
import PreferenceListItems from "../pages/preferences/PreferenceListItems";


const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/account/dashboard" replace /> },
  {
    path: "/notfound",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/notfound" replace />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "account",
    element: (
        <AccountLayout />
      
    ),
    children: [
      { index: true, element: <Navigate to="/account/dashboard" replace /> },
      
      {
        path: "dashboard",
        element: <Dashboard />,
        children:[
          
          {path:':matchId',
           element:<MatchDetail />},
           {
            path: "articles/:articleId",
            element:<NewsDetail />
          },
          {path:"preferences",
          element: (
            <ProtectedRoute>
          <PreferenceListItems />
          </ProtectedRoute>
          )
        },
       
        ]
      
      },
      
     
      
      {
        path: "matches",
        element: <Matches />,

      },
    ],
  },
]);

export default router;
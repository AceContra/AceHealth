import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    { path: "/", element: <App selectedPage={"DASHBOARD"} /> },
    { path: "/index", element: <App selectedPage={"DASHBOARD"} /> },

    { path: "/dashboard", element: <App selectedPage={"DASHBOARD"} /> },
    { path: "/patients", element: <App selectedPage={"PATIENTS"} /> },
    { path: "/doctors", element: <App selectedPage={"DOCTORS"} /> },
    { path: "/iots", element: <App selectedPage={"IOTS"} /> },

    { path: "/settings", element: <App selectedPage={"SETTINGS"} /> },
    { path: "/exit", element:  <App selectedPage={"EXIT"} />  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();

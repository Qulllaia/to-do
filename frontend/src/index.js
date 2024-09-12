import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Login} from './pages/Login'
import { Registration } from "./pages/Registration";
import {Home} from './pages/Home'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { reducer } from './store/userReducer';

const store = createStore(reducer)

const router = createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  }
]
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


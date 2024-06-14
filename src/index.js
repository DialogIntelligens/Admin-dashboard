import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from './App'
import store from './store/index'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
)

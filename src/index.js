import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")); // Updated for React 18
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

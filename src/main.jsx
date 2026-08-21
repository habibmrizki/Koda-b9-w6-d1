import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./router/Router";
import AuthProvider from "./context/AuthProvider.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <MainRoutes />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

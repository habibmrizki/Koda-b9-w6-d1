import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./router/Router";
import AuthProvider from "./context/AuthProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
// import App from "./App.jsx";

import store, { persistor } from "./redux/store.js";
import "./index.css";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// ============ Main Style Scss Start ==========================>>>>
import "./styles/index.scss";
// ============ Main Style Scss End ==========================>>>>

// ============ MUI Theme Start ====================>>>>>>>>>>>>
import { theme } from "./theme/muiTheme.js";
// ============ MUI Theme Start ====================>>>>>>>>>>>>

// ============ React Tost Start ====================>>>>>>>>>>>>
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
// ============ React Tost End ====================>>>>>>>>>>>>

// ============ React Redux toolkit Start ====================>>>>>>>>>>>>

import { Provider } from "react-redux";
import { store } from "./global/store.js";
// ============ React Redux toolkit End ====================>>>>>>>>>>>>

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <HelmetProvider>
        {/* <div onContextMenu={(e) => e.preventDefault()}> */}
        <App />
        {/* </div> */}
        <CssBaseline />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </HelmetProvider>
    </Provider>
  </ThemeProvider>
);

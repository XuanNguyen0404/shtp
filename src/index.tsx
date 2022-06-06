import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// plugins styles downloaded
import "./assets/vendor/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// core styles
import "./assets/scss/argon-dashboard-pro-react.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import GlobalStyles from "./components/GlobalStyles";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  // </React.StrictMode>
);

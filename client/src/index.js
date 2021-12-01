import React from "react";
import ReactDOM from "react-dom";
import { ItemsProvider } from "./components/ItemsContext";
import App from "./pages/App";

ReactDOM.render(
  <React.StrictMode>
    <ItemsProvider>
      <App />
    </ItemsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

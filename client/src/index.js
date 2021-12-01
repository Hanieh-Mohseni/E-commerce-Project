import React from "react";
import ReactDOM from "react-dom";
import { ItemsProvider } from "./components/ItemsContext";
import App from "./pages/App";

//contexts
import { UserProvider } from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

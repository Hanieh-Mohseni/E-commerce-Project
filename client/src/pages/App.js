import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignInPage from "./SignInPage";
import Cart from "./Cart";
import ItemDetails from "../components/ItemDetails";
import SignUpPage from "./SignUpPage";
import Confirmation from "./ConfirmationPage";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/item/:itemId">
            <ItemDetails />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/confirmation">
            <Confirmation />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

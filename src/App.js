import React from "react";
import Navigation from "./components/Navigation";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import Car from "./components/Car";
import cookie from "cookie";

//check if someone has logged in
const checkAuth = () => {
  const cookies = cookie.parse(document.cookie); //loggedIn=True --> {loggedIn: True} creates object of cookies
  return cookies["loggedIn"] ? true : false;
};

//component that checks if someone logged in and redirect the user to given URL("/login")
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        (props) =>
          checkAuth() ? ( //either true when the user is logged in or false when the user logged out
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          ) //window.location.replace("/login")
      }
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Switch>
        <Route path="/login" component={Login} />

        <ProtectedRoute component={Home} path="/" exact />
        <ProtectedRoute component={About} exact path="/about" />
        <ProtectedRoute component={Car} path="/car/:id" />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;

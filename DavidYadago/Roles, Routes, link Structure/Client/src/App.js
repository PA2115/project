import "./App.css";
import React, { useState, useEffect, Fragment } from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NavBar from "./Components/Navbar/NavBar";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Register from "./Components/Register";
import Products from "./Pages/Products";
import { UploadForm } from "./Components/UploadForm";
import Gallery from "./Components/Gallery";
import RewardsOffer from "./Components/Dashboard/RewardsOffer";
import MerchantRoute from "./Pages/MerchantRoute";
import LocationsRoute from "./Pages/LocationsRoute";
import MemberRoute from "./Pages/MemberRoute";
import PageNotFound from "./Pages/PageNotFound";
import AllRewards from "./Components/Dashboard/AllRewards";
import ShowProfile from "./Components/Dashboard/ShowProfile";

function App() {
  var userLoggedIn = localStorage.getItem("token");

  //Grab user Profile for display
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/roles", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  //--------------------------START LIST OF PRIVATE ROUTES--------------------------
  //PRIVATE ROUTE1
  const PrivateRoute = ({ component: Component, ...rest }) => {
    var userLoggedIn = localStorage.getItem("token");

    return (
      <Route
        {...rest}
        render={(props) => {
          if (userLoggedIn) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            );
          }
        }}
      />
    );
  };
  PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
  };
  //--------------------------END LIST OF PRIVATE ROUTES--------------------------
  return (
    <>
      <Fragment>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/reset/:token" component={ResetPassword} />
            <Route path="/products" component={Products} />
            <Route path="/uploads" component={UploadForm} />
            <Route path="/gallery" component={Gallery} />
            <PrivateRoute path="/rewards" component={RewardsOffer} />
            <PrivateRoute path="/allrewards" component={AllRewards} />
            <PrivateRoute path="/merchants" component={MerchantRoute} />
            <PrivateRoute path="/locations" component={LocationsRoute} />
            <PrivateRoute path="/users" component={MemberRoute} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/updateprofile" component={ShowProfile} />

            <Route
              path="/login"
              render={(props) =>
                !userLoggedIn ? (
                  <Login {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              path="/register"
              render={(props) =>
                !userLoggedIn ? (
                  <Register {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </Fragment>
    </>
  );
}

export default App;

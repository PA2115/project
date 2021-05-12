import "./App.css";
import React, { useState, useEffect, Fragment } from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NoMatch from "./Pages/NoMatch";
import Rewards from "./Pages/Rewards";
import NavBar from "./Components/Navbar/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import UserRecords from "./Pages/UserRecords";
import Reports from "./Pages/Reports";
// import Navbar from "./Components/Dashboard/Navbar";
// import Products from "./Pages/Products";
import MemberRoute from "./Pages/MemberRoute";
import MerchantRoute from "./Pages/MerchantRoute";
// import { UploadImages } from "./Pages/UploadImages";
import LocationList from "./Components/Locations/LocationList";
import TransactionList from "./Components/Transactions/TransactionList";
import TopTransaction from "./Components/Transactions/TopTransaction";
import DistributionList from './Components/Distribution/DistributionList';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  toast.configure();
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });
      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    const userLoggedIn = localStorage.getItem("token");
    return (
      <Route
        {...rest}
        render={(props) =>
          userLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login", 
              }}
            />
          )
        }
      />
    );
  };
  PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
  };
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/reports" component={Reports} />
          <PrivateRoute path="/merchant" component={MerchantRoute} />
          <PrivateRoute path="/locations" component={LocationList} />
          <PrivateRoute path="/transactions" component={TransactionList} />
          <PrivateRoute path="/distributions" component={DistributionList} />
          <PrivateRoute path="/transactionstop" component={TopTransaction} />
          <PrivateRoute path="/users" component={MemberRoute} />
          <PrivateRoute path="/rewards" component={Rewards} /> 
          {/* <PrivateRoute
            path="/rewards"
            render={(props) =>
              isAuthenticated ? (
                <Rewards {...props} setAuth={setAuth} />
              ) : (
                <Redirect to=" /" />
              )
            }
          /> */}
          <Route
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/Login" />
              )
            }
          />
          <Route component={NoMatch}></Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;

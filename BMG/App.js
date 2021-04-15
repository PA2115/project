import "./App.css";
import React, { useState, useEffect, Fragment } from "react";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import NoMatch from "./NoMatch";
import Rewards from "./Rewards";
import NavBar from "./Components/Pages/NavBar";
import Footer from "./Components/Pages/Footer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Switch,  Route, Redirect} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register"
import { UserRecords } from "./UserRecords";
// import ProtectedRoute from "./ProtectedRoute";


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
  }, []);
  const RouteWithNavbar = ({exact, path, component:Component, ...rest}) => 
  {
    return <Route exact={exact} path={path} {...rest} render={(routeProps) => {
       return <><nav {...routeProps}/><Component {...routeProps}/></>
    }
    }
    />
  }
  return (
    <Fragment>
      <Router>
        <NavBar></NavBar>
        <div className="page-container">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/about" component={About}></Route>
              <Route path="/contact" component={Contact}></Route>
              <Route path="/records" component={UserRecords}></Route>
              <Route path="/Rewards" render={(props) => isAuthenticated ? ( <Rewards {...props} setAuth={setAuth} />) : (<Redirect to="/Rewards" />)}/>
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
          {/* Require a 2nd navbar here, how can I add it? Also current navbar needs to be removed*/}
            <Route
              exact path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
              <Route component={NoMatch}></Route>
            </Switch>
          </div>
      </Router>
    </Fragment>
  );
}

export default App;

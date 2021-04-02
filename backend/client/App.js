
import './App.css';
import React from 'react';
import Home  from './Home';
import About from './About';
import Contact from './Contact';
import NoMatch from './NoMatch';
import Services from './Services';
import Login from './Login';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div>
       <Router>
       <NavBar></NavBar>
        <div className = "page-container">
         <div className = "content-wrap">
        
          <Switch>
            <Route exact path ='/' component={Home}></Route>
            <Route path ='/about' component={About}></Route>
            <Route path ='/contact' component={Contact}></Route>
            <Route path ='/services' component={Services}></Route>
            <Route path ='/login' component={Login}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </div> 
        <Footer></Footer>
        </div>
        </Router>
        </div>
  );
}

export default App;

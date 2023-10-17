import { UserProvider } from "./context/index";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Manage from "./components/Manage";
import Debt from "./components/Debt";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Budget from "./components/Budget";
function App() {

  const [mode,setMode]=useState('light');

  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor='#121212';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
    }
  }

  return (
    <UserProvider>
      <Router>
        <Switch>
        <Route exact path="/">
            <ToastContainer position="top-center" />
            <Login />
          </Route>
          <Route exact path="/login">
            <ToastContainer position="top-center" />
            <Login />
          </Route>

          <Route exact path="/register">
            <ToastContainer position="top-center" />
            <Register />
          </Route>

          <Route exact path="/main">
            <Navbar mode={mode} toggleMode={toggleMode}/>
            <ToastContainer position="top-center" />
            <Body mode={mode}/>
          </Route>
          
          <Route exact path="/manage">
            <Navbar mode={mode} toggleMode={toggleMode}/>
            <ToastContainer position="top-center" />
            <Manage mode={mode}/>
          </Route>

          <Route exact path="/budget">
            <Navbar mode={mode} toggleMode={toggleMode}/>
            <ToastContainer position="top-center" />
            <Budget mode={mode}/>
          </Route>

          <Route exact path="/debt">
            <Navbar mode={mode} toggleMode={toggleMode}/>
            <ToastContainer position="top-center" />
            <Debt mode={mode}/>
          </Route>

        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;

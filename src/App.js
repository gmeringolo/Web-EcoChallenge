import React from "react";
//import './assetss/css/App.css';
//import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Desafios from "./components/Desafios";
import Faq from "./components/Faq";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute path="/home" exact component={Home} />
          <ProtectedRoute path="/desafios" exact component={Desafios} />
          <ProtectedRoute path="/preguntas" exact component={Faq} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;

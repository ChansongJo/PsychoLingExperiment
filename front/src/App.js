import React from 'react';
import {Link, Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import Experiment from "./components/Experiment/Loader";
import Instruction from "./components/Instruction";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Router basename="/main">
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/exp/:id/:mode' exact component={Experiment} />
        <Route path='/exp/:id' exact component={Instruction} />
      </Switch>
    </Router>
  );
}

export default App;

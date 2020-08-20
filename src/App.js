import React from 'react';
import {Link, Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import Experiment from "./components/Experiment/Loader";
import Instruction from "./components/Instruction";
import Enroll from "./components/Enroll";
import HomePage from "./components/MainPage";
import ThanksPage from './components/Experiment/Thanks';
import CorsiTest from './components/CorsiTest';

const Page404 = () => {
  return (
    <h3>404 - Not found</h3>
  );
};

function App() {
  return (
    <Router basename="/exp">
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/enroll' exact component={Enroll} />
        <Route path='/thanks' exact component={ThanksPage} />
        <Route path='/corsi' exact component={CorsiTest} />
        <Route path='/:id' exact component={Instruction} />
        <Route path='/:id/run' exact component={Experiment} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;

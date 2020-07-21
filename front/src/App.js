import React, {useState, useContext} from 'react';
import {Link, Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import Experiment from "./components/Experiment";
import MainPage from "./components/MainPage";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router basename="/main">
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/experiment/:id' exact component={Experiment} />
      </Switch>
    </Router>
  );
}

export default App;

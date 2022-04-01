import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } exact/>
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import DiscordForm from './components/DiscordForm';
import Survey from './viewpage/Survey';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={DiscordForm} />
          <Route path='/preview' component={Survey} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import DatabaseRef from './app/DatabaseRef.js';
import NFCtestAvailability from './app/NFCtestAvailability.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Baroque Identities</h1>
        </header>
        <DatabaseRef />
        <NFCtestAvailability />
      </div>
    );
  }
}

export default App;

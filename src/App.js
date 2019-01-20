import React, { Component } from 'react';
import './App.css';
import DatabaseRef from './app/DatabaseRef.js';
import Header from './app/Header.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <DatabaseRef />
      </div>
    );
  }
}

export default App;

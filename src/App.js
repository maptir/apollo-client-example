import {Query, Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import React, {Component} from 'react'
import './App.css'

import Users from './components/Users';
import Customers from './components/Customers';

class App extends Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <span>FiveBook</span>
      </header>
      <div className="App-row">
        <Users />
        <Customers />
      </div>
    </div>)
  }
}

export default App;

import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {TopBar} from './TopBar.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopBar/>
            </div>
        );
    }
}
export default App;

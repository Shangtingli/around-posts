import React, { Component } from 'react';
import './App.css';
import {TopBar} from './TopBar.js';
import {Register} from "./Register";
import {Main} from './Main';
class App extends Component {
    render() {
        return (
            <div className="App">
                <TopBar/>
                <Main/>
                {/*<Register/>*/}
            </div>
        );
    }
}
export default App;

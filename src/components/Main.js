import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Home } from './Home';
import { Switch, Route, Redirect } from 'react-router-dom';

export class Main extends React.Component {
    getHome = () => {
        console.log("getHome function in Main.js script");
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }

    getLogin = () => {
        console.log("getLogin function in Main.js script");
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
    }

    render() {
        console.log("Render function in Main.js script");
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getLogin}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route render={this.getLogin}/>
                </Switch>
            </div>
        );
    }
}

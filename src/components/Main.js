
import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Home } from './Home';
import { Switch, Route, Redirect } from 'react-router-dom'

/**
 * Passed in props: isLoggedIn, handleLogin()
 */
export class Main extends React.Component {
    /**
     * Acts like a dispatchServlet.
     * Decide to render home or the login page
     * according to the state of isLoggedIn
     * @returns {*}
     */
    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login" />;
    }

    /**
     * Acts like a dispatchServlet.
     * Decide to render home or the login page
     * according to the state of isLoggedIn
     * @returns {*}
     */
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin} />;
    }
    /**
     * render the functions according to the
     * functions specified above.
     */
    render() {
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

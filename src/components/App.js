import React, { Component } from 'react';
import { TopBar } from './TopBar';
import { Main } from './Main';
import { TOKEN_KEY } from '../constants';

class App extends Component {

    /**
     * Indicating if the user is logged in.
     * @type {{isLoggedIn: boolean}}
     */
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
    }

    /**
     * @param token
     * Used in the component of login.
     * Set the token key in localStorage.
     */
    handleLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({ isLoggedIn: true });
    }

    /**
     * Used in the component of Login.
     */
    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({ isLoggedIn: false });
    }


    render() {
        return (
            <div className="App">
                /**
                *Pass the state isLoggedIn to the two component,
                * also the functions to handle login and logout.
                * Pass handleLogout only to the Topbar because
                * the logout button would only be used in TopBar
*/
                <TopBar isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>
        );
    }
}

export default App;
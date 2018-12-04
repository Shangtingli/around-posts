import React from 'react';
import { Icon } from 'antd';
import logo from '../assets/images/logo.svg';

/**
 * Passed in props: handleLogout(), isLoggedIn
 */
export class TopBar extends React.Component {
    /**
     * Also we can use a curly bracket to wrap up
     * a javascript expression. This expression decide
     * whether or not to render the logout buttons
     */
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App-title">Around</div>
                {this.props.isLoggedIn ?
                    <a className="logout" onClick={this.props.handleLogout} >
                        <Icon type="logout"/>{' '}Logout
                    </a> : null}
            </header>
        );
    }
}

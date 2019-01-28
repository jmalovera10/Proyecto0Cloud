import React, {Component} from 'react';
import UserNavbar from './navbars/UserNavbar';
import IndexNavbar from './navbars/IndexNavbar';
import Events from './home/EventsView';
import NewEventView from './home/NewEventView';
import RegisterView from './index/RegisterView';
import LoginView from "./index/LoginView";
import {Route, Switch, Redirect} from "react-router-dom";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            isRegister: null
        };
        this.updateAuth = this.updateAuth.bind(this);
    }

    /**
     * Method that updates the current session state
     * @param auth contains whether the user is authenticated or not
     */
    updateAuth(auth) {
        this.setState({auth: auth});
        this.redirectToTarget();
    }

    /**
     * Method that redirects user to the target url
     */
    redirectToTarget() {
        this.context.router.history.push(`/`);
    }

    render() {
        return (
            <div id='main'>
                {
                    this.state.auth ? <UserNavbar/> : <IndexNavbar isRegister={this.state.isRegister}/>
                }
                {
                    <Switch>
                        <Route path='/new_event' render={() =>
                            this.state.auth ?
                                <NewEventView/>
                                : <Redirect to='/register'/>
                        }/>
                        <Route path='/login' render={() =>
                            <LoginView updateAuth={this.updateAuth}/>
                        }/>
                        <Route path='/register' render={() =>
                            <RegisterView updateAuth={this.updateAuth}/>
                        }/>
                        <Route path='/events' render={() =>
                            <Events/>
                        }/>
                        <Route path='/' render={() =>
                            this.state.auth ?
                                <Redirect to='/events'/>
                                : <Redirect to='/register'/>
                        }/>

                    </Switch>
                }
            </div>
        );
    }
}

export default App;

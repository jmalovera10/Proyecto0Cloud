import React, {Component} from 'react';
import UserNavbar from './navbars/UserNavbar';
import IndexNavbar from './navbars/IndexNavbar';
import Events from './home/EventsView';
import NewEventView from './home/NewEventView';
import RegisterView from './index/RegisterView';
import LoginView from "./index/LoginView";
import {Route, Switch} from "react-router-dom";

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
    updateAuth(auth){
        this.setState({auth: auth})
    }

    render() {
        return (
            <div id='main'>
                {
                    this.state.auth ? <UserNavbar/> : <IndexNavbar isRegister={this.state.isRegister}/>
                }
                {
                    this.state.auth ?
                        <Switch>
                            <Route path='/events' render={(props) => (<Events/>)}/>
                            <Route path='/new_event' render={(props) => (<NewEventView/>)}/>
                        </Switch>
                        : <Switch>
                            <Route exact path='/' render={(props) => {
                                if(this.state.isRegister=== null || !this.state.isRegister)
                                    this.setState({isRegister: true});
                                return <RegisterView updateAuth={this.updateAuth}/>
                            }}/>
                            <Route path='/login' render={(props) => {
                                if(this.state.isRegister=== null || this.state.isRegister)
                                    this.setState({isRegister: false});
                                return <LoginView updateAuth={this.updateAuth}/>
                            }}/>
                        </Switch>
                }
            </div>
        );
    }
}

export default App;

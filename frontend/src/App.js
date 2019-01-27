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
            logged: false,
            isRegister: null
        }
    }

    render() {
        return (
            <div id='main'>
                {
                    this.state.logged ? <UserNavbar/> : <IndexNavbar isRegister={this.state.isRegister}/>
                }
                {
                    this.state.logged ?
                        <Switch>
                            <Route path='/events' render={(props) => (<Events/>)}/>
                            <Route path='/new_event' render={(props) => (<NewEventView/>)}/>
                        </Switch>
                        : <Switch>
                            <Route exact path='/' render={(props) => {
                                if(this.state.isRegister=== null || !this.state.isRegister)
                                    this.setState({isRegister: true});
                                return <RegisterView/>
                            }}/>
                            <Route path='/login' render={(props) => {
                                if(this.state.isRegister=== null || this.state.isRegister)
                                    this.setState({isRegister: false});
                                return <LoginView/>
                            }}/>
                        </Switch>
                }
            </div>
        );
    }
}

export default App;

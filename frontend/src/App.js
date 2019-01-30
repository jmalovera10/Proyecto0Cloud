import React, {Component} from 'react';
import Events from './home/EventsView';
import NewEventView from './home/NewEventView';
import RegisterView from './index/RegisterView';
import LoginView from "./index/LoginView";
import {Route, Switch, Redirect} from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            isRegister: null
        };
        this.updateAuth = this.updateAuth.bind(this);
        this.submitNewEvent = this.submitNewEvent.bind(this);
    }

    /**
     * Method that updates the current session state
     * @param auth contains whether the user is authenticated or not
     */
    updateAuth(auth) {
        this.setState({auth: auth});
    }

    submitNewEvent(event) {
        let cookies = new Cookies();
        event.userId = cookies.get("EVENT_APP_ID_COOKIE");
        console.log(event);
        axios.post('/API/submit_event', event)
            .then((res) => {
                console.log(res);
                return res.data;
            })
            .then((data) => {

            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        let cookies = new Cookies();
        let token = cookies.get("EVENT_APP_TOKEN_COOKIE");
        if (token) {
            this.setState({auth: true});
        }
    }

    render() {
        return (
            <div id='main'>
                {
                    <Switch>
                        <Route path='/new_event' render={() =>
                            this.state.auth ?
                                <NewEventView submitNewEvent={this.submitNewEvent}/>
                                : <Redirect to='/register'/>
                        }/>
                        <Route path='/login' render={() =>
                            this.state.auth ?
                                <Redirect to='/events'/>
                                : <LoginView updateAuth={this.updateAuth}/>
                        }/>
                        <Route path='/register' render={() =>
                            this.state.auth ?
                                <Redirect to='/events'/>
                                : <RegisterView updateAuth={this.updateAuth}/>
                        }/>
                        <Route path='/events' render={() =>
                            this.state.auth ?
                                <Events/>
                                : <Redirect to='/register'/>
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

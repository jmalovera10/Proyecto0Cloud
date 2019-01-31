import React, {Component} from 'react';
import Events from './home/EventsView';
import NewEventView from './home/NewEventView';
import EditEventView from './home/EditEventView';
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
            isRegister: null,
            editEvent: null,
            events: []
        };
        this.updateAuth = this.updateAuth.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.submitNewEvent = this.submitNewEvent.bind(this);
        this.submitEditEvent = this.submitEditEvent.bind(this);
    }

    /**
     * Method that updates the current session state
     * @param auth contains whether the user is authenticated or not
     */
    updateAuth(auth) {
        this.setState({auth: auth});
    }

    /**
     * Method that gets all user events by user id
     */
    getEvents() {
        let cookies = new Cookies();
        let userId = cookies.get("EVENT_APP_ID_COOKIE");
        axios.get('/API/events/'+userId)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                this.setState({events: data})
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Method that submits a new event created by the user
     * @param event created by the user
     */
    submitNewEvent(event) {
        let cookies = new Cookies();
        event.userId = cookies.get("EVENT_APP_ID_COOKIE");
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

    /**
     * Method that submits an edited event done by the user
     * @param event edited by the user
     */
    submitEditEvent(event) {
        let cookies = new Cookies();
        event.userId = cookies.get("EVENT_APP_ID_COOKIE");
        console.log(event);
        axios.post('/API/edit_event', event)
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
            this.getEvents();
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
                        <Route path='/edit_event' render={() =>
                            this.state.auth ?
                                <EditEventView submitEditEvent={this.submitEditEvent} event={this.state.editEvent}/>
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
                                <Events events={this.state.events}/>
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

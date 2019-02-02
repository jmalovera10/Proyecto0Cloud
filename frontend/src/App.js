import React, {Component} from 'react';
import Events from './home/EventsView';
import NewEventView from './home/NewEventView';
import EditEventView from './home/EditEventView';
import EventDetailView from './home/EventDetailView';
import RegisterView from './index/RegisterView';
import LoginView from "./index/LoginView";
import {Route, Switch, Redirect} from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';

import './App.css';
import IndexNavbar from "./navbars/IndexNavbar";
import UserNavbar from "./navbars/UserNavbar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            isRegister: null,
            editEvent: null,
            events: [],
            messageSubmit: ""
        };
        this.updateAuth = this.updateAuth.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.submitNewEvent = this.submitNewEvent.bind(this);
        this.submitEditEvent = this.submitEditEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.logout = this.logout.bind(this);
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
        axios.get('/API/events/' + userId)
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
                return res.data;
            })
            .then((data) => {
                if (data.event) {
                    this.setState((prevState) => ({
                        events: prevState.events.concat(data.event)
                    }));
                }
                console.log(data.event);
                this.setState({messageSubmit: data.message});
                window.location.reload();
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
        let userId = cookies.get("EVENT_APP_ID_COOKIE");
        axios.put('/API/edit_event/'+userId, event)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                this.setState({messageSubmit: data.message})
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Method that deletes an event
     * @param eventId of the event to be deleted
     * @param eventPosition of the event to be removed from the list
     */
    deleteEvent(eventId, eventPosition) {
        let cookies = new Cookies();
        let userId = cookies.get("EVENT_APP_ID_COOKIE");
        this.setState((prevState) => ({
                events: prevState.events.filter((val, index) => {
                    console.log(index);
                    console.log(eventPosition);
                    return index !== eventPosition;
                })
            })
        );
        axios.delete('/API/delete_event/' + userId + '/' + eventId)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Method that logs out a user
     */
    logout() {
        let cookies = new Cookies();
        cookies.remove("EVENT_APP_ID_COOKIE");
        cookies.remove("EVENT_APP_TOKEN_COOKIE");
        this.setState({auth: false});
        window.location.reload();
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
                        <Route path="/register" render={()=>
                            <IndexNavbar isRegister={true}/>
                        }/>
                        <Route path="/login" render={()=>
                            <IndexNavbar isRegister={false}/>
                        }/>
                        <Route path="/" render={()=>
                            <UserNavbar logout={this.logout}/>
                        }/>
                    </Switch>
                }
                {
                    <Switch>
                        <Route path='/new_event' render={() =>
                            this.state.auth ?
                                <NewEventView submitNewEvent={this.submitNewEvent} message={this.state.messageSubmit}/>
                                : <Redirect to='/register'/>
                        }/>
                        <Route path='/edit_event/:eventPosition' render={(props) =>
                            this.state.auth ?
                                <EditEventView submitEditEvent={this.submitEditEvent}
                                               event={this.state.events[props.match.params.eventPosition]}/>
                                : <Redirect to='/register'/>
                        }/>
                        <Route path='/login' render={() =>
                            this.state.auth ?
                                <Redirect to='/events'/>
                                : <LoginView updateAuth={this.updateAuth} getEvents={this.getEvents}/>
                        }/>
                        <Route path='/register' render={() =>
                            this.state.auth ?
                                <Redirect to='/events'/>
                                : <RegisterView updateAuth={this.updateAuth}/>
                        }/>
                        <Route path='/events/:id' render={(props) => {
                            return this.state.auth ?
                                <EventDetailView eventId={props.match.params.id}/>
                                : <Redirect to='/register'/>
                        }}/>
                        <Route path='/events' render={() =>
                            this.state.auth ?
                                <Events events={this.state.events} deleteEvent={this.deleteEvent}/>
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

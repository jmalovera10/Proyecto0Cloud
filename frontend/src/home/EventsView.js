import React, {Component} from 'react';
import UserNavbar from '../navbars/UserNavbar';
import './EventsView.css';

export default class EventsView extends Component {

    render() {
        return (
            <div>
                <UserNavbar/>
                <h1>Hello World!</h1>
            </div>
        );
    }
}
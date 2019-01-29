import React, {Component} from 'react';
import UserNavbar from '../navbars/UserNavbar';
import './EventDetailView.css';

export default class EventDetailView extends Component {

    render() {
        return (
            <div>
                <UserNavbar/>
                <h1>Hello World!</h1>
            </div>
        );
    }
}
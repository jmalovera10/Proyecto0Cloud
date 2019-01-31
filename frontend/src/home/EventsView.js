import React, {Component} from 'react';
import UserNavbar from '../navbars/UserNavbar';
import EventCard from './EventCard';
import PropTypes from 'prop-types';

import './EventsView.css';

export default class EventsView extends Component {

    render() {
        let eventCards = [];
        if(this.props.events) {
            this.props.events.forEach((e) => {
                console.log(e);
                eventCards.push(<EventCard key={e.ID} event={e}/>);
            });
        }
        return (
            <div>
                <UserNavbar/>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Mis eventos</h1>
                    </div>
                </div>
                <div className="row justify-content-start">
                    {eventCards}
                </div>
            </div>
        );
    }
}

EventsView.propTypes = {
    events: PropTypes.array.isRequired
};
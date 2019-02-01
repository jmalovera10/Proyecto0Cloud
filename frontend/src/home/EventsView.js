import React, {Component} from 'react';
import EventCard from './EventCard';
import PropTypes from 'prop-types';

import './EventsView.css';

export default class EventsView extends Component {

    render() {
        let eventCards = [];
        if (this.props.events) {
            let i = 0;
            this.props.events.forEach((e) => {
                eventCards.push(<EventCard key={e.ID} deleteEvent={this.props.deleteEvent} eventPosition={i}
                                           event={e}/>);
                i++;
            });
        }
        return (
            <div>
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
    events: PropTypes.array.isRequired,
    deleteEvent: PropTypes.func.isRequired
};
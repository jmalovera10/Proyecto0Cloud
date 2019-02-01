import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './EventCard.css';

export default class EventCard extends Component {

    deleteEvent() {
        this.props.deleteEvent(this.props.event.ID, this.props.eventPosition);
    }

    render() {
        return (
            <div className="col-sm-2 col-lg-3">
                <div className="card">
                    <div className="card-body">
                        <div className="row justify-content-around">
                            <div className="col-10">
                                <h4 className="card-title">{this.props.event.NAME}
                                    <Link to={"/edit_event/"+this.props.eventPosition}>
                                        <button className="option-button"><span><i className="fa fa-pen"/></span>
                                        </button>
                                    </Link>
                                </h4>

                            </div>
                            <div className="col-2">
                                <button className="btn btn-danger" onClick={this.deleteEvent.bind(this)}>
                                    <span><i className="fa fa-times cancel-button"/></span>
                                </button>
                            </div>
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">Fecha inicio: {this.props.event.INIT_DATE}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Fecha fin: {this.props.event.END_DATE}</h6>
                        <div className="row justify-content-around">
                            <div className="col-6 center-items">
                                <Link to={"/events/" + this.props.event.ID}>
                                    <button className="btn btn-success"> Ver más</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
    eventPosition: PropTypes.number.isRequired,
    deleteEvent: PropTypes.func.isRequired,
};
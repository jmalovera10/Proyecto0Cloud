import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './EventsView.css';

export default class EventCard extends Component {

    render() {
        return (
            <div className="col-sm-3 col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-8">
                                <h4 className="card-title">{this.props.event.NAME}</h4>
                            </div>
                            <div className="col-4">
                            <button className='btn btn-lg '>
                                <span className="fa fa-pencil"></span>
                            </button>
                            </div>

                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">Fecha inicio: {this.props.event.INIT_DATE}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Fecha fin: {this.props.event.END_DATE}</h6>
                        <Link to={"/events/"+this.props.event.ID}><button className="btn btn-success"> Ver más</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

EventCard.propTypes = {
    event: PropTypes.object.isRequired
};
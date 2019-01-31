import React, {Component} from 'react';
import UserNavbar from '../navbars/UserNavbar';
import './EventDetailView.css';
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

export default class EventDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: null
        };

    }

    componentDidMount() {
        if (!this.state.event) {
            console.log(this.props.eventId);
            let cookies = new Cookies();
            let userId = cookies.get("EVENT_APP_ID_COOKIE");
            axios.get('/API/events/' + userId + '/' + this.props.eventId)
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    console.log(data);
                    this.setState({event: data[0]})
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">{this.state.event ? this.state.event.NAME : null}</h1>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-around center-items">
                                    <div className="col-6">
                                        <h6 className="card-title">CATEGORÍA:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">{this.state.event ? this.state.event.CATEGORY : null}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">LUGAR:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">{this.state.event ? this.state.event.PLACE : null}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">DIRECCIÓN:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">{this.state.event ? this.state.event.DIRECTION : null}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">FECHA INICIO:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">{this.state.event ? this.state.event.INIT_DATE : null}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">FECHA FIN:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">{this.state.event ? this.state.event.END_DATE : null}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">MODALIDAD:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="card-title">{this.state.event ? this.state.event.MODE : null}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

EventDetailView.propTypes = {
    eventId: PropTypes.string.isRequired
};
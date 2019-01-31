import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './UserNavbar.css';

export default class UserNavbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <h1 className="navbar-brand" >Eventapp</h1>
                <Link to='/events'>Eventos</Link>
                <div className="ml-auto">
                    <Link to='/new_event'><button className="btn btn-success">Nuevo Evento</button></Link>
                </div>
            </nav>
        );
    }
}
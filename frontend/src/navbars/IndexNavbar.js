import React, {Component} from 'react';
import './IndexNavbar.css';

export default class IndexNavbar extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Eventapp</a>
                <div className="ml-auto">
                    <button className="btn btn-success">Registrarse</button>
                    <button className="btn btn-outline-success">Ingresar</button>
                </div>
            </nav>
        );
    }
}
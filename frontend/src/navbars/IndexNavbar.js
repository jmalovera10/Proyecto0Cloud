import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './IndexNavbar.css';

export default class IndexNavbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <h1 className="navbar-brand">Eventapp</h1>
                <div className="ml-auto">
                    {
                        this.props.isRegister?
                            <Link to='/login'><button className="btn btn-outline-success">Ingresar</button></Link>
                            :<Link to='/'><button className="btn btn-success">Registrarse</button></Link>
                    }
                </div>
            </nav>
        );
    }
}
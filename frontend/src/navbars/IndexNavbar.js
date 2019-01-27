import React, {Component} from 'react';
import { Link } from 'react-router-dom'
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
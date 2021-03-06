import React, {Component} from 'react';
import axios from 'axios';
import './RegisterView.css';
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

export default class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            message: null
        }
    }

    /**
     * Method that handles name input change
     * @param event the event generated by the tag
     */
    onNameChange(event) {
        this.setState({name: event.target.value});
    }

    /**
     * Method that handles email input change
     * @param event the event generated by the tag
     */
    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    /**
     * Method that handles password input change
     * @param event the event generated by the tag
     */
    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    /**
     * Method that handles password confirmation input change
     * @param event the event generated by the tag
     */
    onPasswordVerificationChange(event) {
        this.setState({confirmPassword: event.target.value});
    }

    /**
     * Method that submits the registration attempt to the server
     * @param event the event generated by the button
     */
    onSubmitRgister(event) {
        event.preventDefault();
        let emailRegex = /^\S+@\S+(\.\S+)+$/;
        if (!emailRegex.test(this.state.email)) {
            this.setState({message: "Ingrese un correo electrónico válido"})
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({message: "Las claves deben coincidir"})
        }
        else {
            let user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            };
            axios.post('/API/registerUser', user)
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    this.setState({message: data.message});
                    this.props.updateAuth(data.auth);
                    if (data.auth) {
                        let cookies = new Cookies();
                        cookies.set("EVENT_APP_TOKEN_COOKIE", data.token, {path: '/'});
                        cookies = new Cookies();
                        cookies.set("EVENT_APP_ID_COOKIE", data.id, {path: '/'});
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Eventapp</h1>
                        <p className="lead">La mejor aplicación para gestionar tus eventos</p>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="col-sm-3 col-lg-4"/>
                    <div className="col-sm-6 col-lg-4">
                        <article className="card-body">
                            <h4 className="card-title text-center mb-4 mt-1">Registrarse</h4>
                            <hr/>
                            {
                                this.state.message ?
                                    <p className="text-success text-center">{this.state.message}</p>
                                    : null
                            }
                            <form>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-user"/>
                                            </span>
                                        </div>
                                        <input name="" className="form-control" placeholder="Nombre"
                                               type="text" onChange={this.onNameChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-envelope"/> </span>
                                        </div>
                                        <input name="" className="form-control" placeholder="Correo electrónico"
                                               type="email" onChange={this.onEmailChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                        </div>
                                        <input className="form-control" placeholder="Contraseña" type="password"
                                               onChange={this.onPasswordChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                        </div>
                                        <input className="form-control" placeholder="Confirmar contraseña"
                                               type="password" onChange={this.onPasswordVerificationChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success btn-block"
                                            onClick={this.onSubmitRgister.bind(this)}> Registrarse
                                    </button>
                                </div>
                            </form>
                        </article>
                    </div>
                    <div className="col-sm-3 col-lg-4"/>
                </div>
            </div>
        );
    }
}

RegisterView.propTypes = {
    updateAuth: PropTypes.func.isRequired
};
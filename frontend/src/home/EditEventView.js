import React, {Component} from 'react';
import UserNavbar from '../navbars/UserNavbar';
import PropTypes from 'prop-types';

import './EditEventView.css';

export default class EditEventView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.event.id,
            name: this.props.event.name,
            category: this.props.event.category,
            place: this.props.event.place,
            direction: this.props.event.direction,
            initDate: this.props.event.initDate,
            endDate: this.props.event.endDate,
            mode: this.props.event.mode,
            message: this.props.event.category
        }
    }

    /**
     * Method that handles user input on name field
     * @param event triggered by a component
     */
    onNameChange(event) {
        this.setState({name: event.target.value});
    }

    /**
     * Method that handles user input on category field
     * @param event triggered by a component
     */
    onCategoryChange(event) {
        this.setState({category: event.target.value});
    }

    /**
     * Method that handles user input on place field
     * @param event triggered by a component
     */
    onPlaceChange(event) {
        this.setState({place: event.target.value});
    }

    /**
     * Method that handles user input on direction field
     * @param event triggered by a component
     */
    onDirectionChange(event) {
        this.setState({direction: event.target.value});
    }

    /**
     * Method that handles user input on init date field
     * @param event triggered by a component
     */
    onInitDateChange(event) {
        this.setState({initDate: event.target.value});
    }

    /**
     * Method that handles user input on end date field
     * @param event triggered by a component
     */
    onEndDateChange(event) {
        this.setState({endDate: event.target.value});
    }

    /**
     * Method that handles user input on mode field
     * @param event triggered by a component
     */
    onModeChange(event) {
        this.setState({mode: event.target.value});
    }

    /**
     * Method that submits a new event
     * @param e not that kind of event
     */
    submitEditEvent(e) {
        e.preventDefault();
        if (this.state.name && this.state.category && this.state.place && this.state.direction && this.state.initDate && this.state.endDate && this.state.mode){
            this.props.submitNewEvent({
                id: this.state.id,
                name: this.state.name,
                category: this.state.category,
                place: this.state.place,
                direction: this.state.direction,
                initDate: this.state.initDate,
                endDate: this.state.endDate,
                mode: this.state.mode
            });
        }else{
            this.setState({message: "Debe llenar todos los campos para continuar"})
        }
    }

    render() {

        return (
            <div>
                <UserNavbar/>
                <div className="row justify-content-around">
                    <div className="col-sm-3 col-lg-4"/>
                    <div className="col-sm-6 col-lg-4">
                        <article className="card-body">
                            <h4 className="card-title text-center mb-4 mt-1">Nuevo Evento</h4>
                            <hr/>
                            {
                                this.state.message ?
                                    <p className="text-success text-center">{this.state.message}</p>
                                    : null
                            }
                            <form>
                                <div className="form-group">
                                    <label>Nombre del evento</label>
                                    <div className="input-group">
                                        <input name="" className="form-control" placeholder="Mi Evento"
                                               type="text" onChange={this.onNameChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Categoría del evento</label>
                                    <select className="form-control" onChange={this.onCategoryChange.bind(this)}>
                                        <option value="CONFERENCIA">Conferencia</option>
                                        <option value="SEMINARIO">Seminario</option>
                                        <option value="CONGRESO">Congreso</option>
                                        <option value="CURSO">Curso</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Lugar del evento</label>
                                    <div className="input-group">
                                        <input name="" className="form-control" placeholder="El Lugar"
                                               type="text" onChange={this.onPlaceChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Dirección del evento</label>
                                    <div className="input-group">
                                        <input name="" className="form-control" placeholder="La Dirección"
                                               type="text" onChange={this.onDirectionChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Fecha inicio</label>
                                    <div className="input-group">
                                        <input name="" className="form-control"
                                               type="date" onChange={this.onInitDateChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Fecha fin</label>
                                    <div className="input-group">
                                        <input name="" className="form-control"
                                               type="date" onChange={this.onEndDateChange.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Modalidad del evento</label>
                                    <select className="form-control" onChange={this.onModeChange.bind(this)}>
                                        <option value="PRESENCIAL">Presencial</option>
                                        <option value="VIRTUAL">Virtual</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success btn-block"
                                            onClick={this.submitEditEvent.bind(this)}> Actualizar
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

EditEventView.propTypes = {
    submitEditEvent: PropTypes.func.isRequired,
    event : PropTypes.object.isRequired,
};
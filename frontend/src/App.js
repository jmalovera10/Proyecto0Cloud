import React, {Component} from 'react';
import UserNavbar from './navbars/UserNavbar';
import IndexNavbar from './navbars/IndexNavbar';
import { Route, Switch } from "react-router-dom";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged : true
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.logged? <UserNavbar/>: <IndexNavbar/>
                }
            </div>
        );
    }
}

export default App;

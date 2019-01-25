import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello World!</h1>
            </div>
        );
    }
}

export default App;

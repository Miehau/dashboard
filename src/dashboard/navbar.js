import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";
import Dashboard from './dashboard';
import ToDos from './todos'

class Navbar extends React.Component {


    render() {
        return (
            <Router>
                <div className="ui attached labeled icon menu">
                    <div className="left menu">
                        <NavLink to="/dashboard" className="item" activeClassName="active"><i className="braille icon" />Dashboard</NavLink>
                        <NavLink to="/todo/" className="item" activeClassName="active"><i className="tasks icon" />ToDos</NavLink>
                    </div>
                </div>
                <Route path="/" exact> <Redirect to="/dashboard" /></Route>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/todo/" render={props => (
                    <ToDos {...props} />
                )} />
            </Router>
        );
    }
}

export default Navbar;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../auth/Auth";
import jwtDecode from "jwt-decode";

class Header extends Component {

    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        Auth.deauthenticateUser();
    }

    getUserName() {
        const token = localStorage.getItem("token");
        const decodeToken = jwtDecode(token);
        return decodeToken.name;
    }

    render() {
        return (
            <nav className="nav navbar navbar-collapse collapse">
                    <ul className=" nav navbar-brand navbar-left navbar-collapse">
                            <a className="" href="/dashboard">
                                <img id='logo' src='css/images/logo-white-sm.png' height="30" width="30" />
                            </a>
                    </ul>                    
                    {Auth.isUserAuthenticated() ? (
                        <ul className="nav navbar-nav navbar-right">
                            <li><h5 className="btn headerBtn welcome">Welcome {this.getUserName()}!</h5></li>
                            <li><h5><Link to="/" className="btn headerBtn">Home</Link></h5></li>
                            <li><h5><Link to="/dashboard" className="btn headerBtn">Dashboard</Link></h5></li>
                            <li><h5><Link to="/Form" className="btn headerBtn">Create a Board</Link></h5></li>
                            <li><h5><Link to="/" onClick={this.handleOnClick} className="btn headerBtn">Log Out</Link></h5></li>
                        </ul>
                    ): (
                        <div className="">
                            <li><Link to ="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </div>
                    )}
            </nav>
        )
    }
}

export default Header;
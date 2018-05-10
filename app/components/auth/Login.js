import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Auth from "./Auth"

class Login extends Component {
  constructor(props) {
    super(props);
	this.state = {
	  username: "",
	  password: "",
	  justReg: false,
	  response: null,
	  redirect: false
	};
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleInputChange = this.handleInputChange.bind(this);
	this.loadSuccessMessage = this.loadSuccessMessage.bind(this);
  }

  componentDidMount() {
  	if (localStorage.getItem("successMessage")) {
  	  this.setState({ justReg: true });
  	}
  }

  loadSuccessMessage() {
  	const getMessage = localStorage.getItem("successMessage");
  	return getMessage;
  }

  handleSubmit(event) {
	event.preventDefault();
	axios.post("/auth/login", {
	  "username": this.state.username,
	  "password": this.state.password
	}).then((response) => {
	  //console.log(JSON.stringify(response));
	  Auth.authenticateUser(response.data.token);
      localStorage.removeItem("successMessage");
	  this.setState({ redirect: true });
	})
  }

  handleInputChange(event) {
    //console.log(event.target);
	const value = event.target.value;
	const name = event.target.name;
	this.setState({
	  [name]: value
	});
  }

  render() {
	const { redirect } = this.state;
	if (redirect) {
	  return <Redirect to="/dashboard" />;
	}
	return(
	  <div className="container loginForm col-md-8 col-centered">
	    <center>
	    <h3> Login to view your dashboard </h3>
	    { this.state.justReg ? this.loadSuccessMessage() : <div></div>}
		<form className="form-group" onSubmit={this.handleSubmit}>
		  <div>
			<label>
			  Username:
			  <input
				name="username"
				placeholder="Username"
				className="form-control"
				type="text"
				value={this.state.username}
				onChange={this.handleInputChange} />
			</label>
			<br />
			<label>
			  Password:
			  <input
				name="password"
				placeholder="Password"
				className="form-control"
				type="password"
				value={this.state.password}
				onChange={this.handleInputChange} />
			</label>
			<br />
			<div className="row">
		    <Link to="/" className="btn goBackBtn">Go Back</Link>
		    <input
			  className="btn submitBtn"
			  type="submit"
			  value="Login" />
		    </div>
		  </div>
		</form>

		</center>
	  </div>
	)
  }
}

export default Login;
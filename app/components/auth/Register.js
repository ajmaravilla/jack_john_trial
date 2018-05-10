import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";


class Register extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  username: "",
	  password: "",
	  redirect: false
    };

	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
	event.preventDefault();
	axios.post("/auth/register", {
	  "username": this.state.username,
	  "password": this.state.password
	}).then((response) => {
		localStorage.setItem("successMessage", response.data.message);
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
  		return <Redirect to="/login" />;
  	}
	return(
	  <div className="container registerForm col-md-8 col-centered">
	    <center>
	    <h3> Create an account to get started </h3>
		<form className="form-group" onSubmit={this.handleSubmit}>
		  <div>
			<label>
			  Username:
			  <input
				name="username"
				placeholder="Username"
				className="form-control input-lg"
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
				className="form-control input-lg"
				type="password"
				value={this.state.password}
				onChange={this.handleInputChange} />
		  </label>
		  <div className="row">
		    <Link to="/" className="btn goBackBtn">Go Back</Link>
		    <input
		      className="btn registerBtn"
		      type="submit"
		      value="Create Account" />
		  </div>
		  </div>
	    </form>
	    </center>
	  </div>
	)
  }
}

export default Register;
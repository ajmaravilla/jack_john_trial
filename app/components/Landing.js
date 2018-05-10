import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
  	return (
 	  <div className="jumbotron container-fluid">
  		<center> <h1>CONTENT CLUB</h1>
  	      <div className="col-md-12">
			<Link to ="/login" className="btn landingBtn">Login</Link> 
			<Link to="/register" className="btn landingBtn">Register</Link>
  	      </div>
  	    </center>
  	  </div>

  	);
  }
}

export default Landing; 
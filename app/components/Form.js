// ----------------------------
// import dependencies
// ----------------------------
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from "./layout/Header";

// ----------------------------
// Static Dependencie
// ----------------------------
import FormContainer from './FormContainer';

class Form extends Component {
  render() {
    return (
      <div>
        <Header />
  	    <div className="container">
  	      <div className="columns">
  	          <FormContainer />
  	      </div>
  	    </div>
      </div>
  	);
  }
}

export default Form; 
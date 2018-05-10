// ----------------------------
// import dependencies
// ----------------------------
import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

// ----------------------------
// Static Bars
// ----------------------------

class Main extends Component {
        constructor(props) {
        super(props);
    }

    // componentWillMount() {
    //     console.log("COMPONENT MOUNTED");

    //     // As the page loads, grab the articles that already exist in the database
    //     helpers.getBoards()
    //         .then((response) => {    
    //             this.setState({
    //                 boards: response.data
    //             });                
    //             console.log("RESULTS", response);
    //             console.log("state", this.state.boards);     
    //         })
    // }

    generateImage () {
        return this.props.data.map( (board) => {
            return (
               <div className="full-board col-sm-3" key={board.boardTitle}>
                    <div className="board item card">
                        <div className="title-name">
                            <figure className="board-img img-boxart" id="board-id">
                                <img className="img-art" src={board.img} alt={board.contentDescription} title={board.contentDescription} />
                            </figure>
                            <div className="board-body-text">
                                <h5 className="board-title">{board.boardTitle}</h5>
                                <p className="board-info">{board.category}</p>
                                <br />
                                <a href={board.contentUrl} className="board-username left">{board.username}</a>

                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        { /* This is what actually generates the images */ }
                        { this.generateImage() }
                    </div>
                </div>
            </div>
        );
    }
};

export default Main;
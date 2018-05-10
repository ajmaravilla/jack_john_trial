// ----------------------------
// import dependencies
// ----------------------------
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import helpers from "../utils/helpers";
import Board from './Board';

import Header from './layout/Header.js';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      selectedBoard: null,
    };
    this.getOneBoard = this.getOneBoard.bind(this);
    this.generateImage = this.generateImage.bind(this);
  }

componentWillMount() {
  console.log("COMPONENT MOUNTED");

        // As the page loads, grab the articles that already exist in the database
  helpers.getBoards()
  .then((response) => {
    this.setState({
      boards: response.data
    });
    // console.log("RESULTS", response);
    // console.log("state", this.state.boards);
  })
  }


    getOneBoard (e) {
        console.log("dataset: " + e.target.dataset.id);
        helpers.getOneBoard({id: e.target.dataset.id}
        ).then((res) => {
            this.setState({selectedBoard: res})
            //console.log("This is the board! " + JSON.stringify(this.state.selectedBoard));
        })
    }

    generateImage () {
        return this.state.boards.map((board) => {
            return (
               <div className="full-board col-sm-3 off-set-3" key={board.boardTitle} id={board._id}>
                    <div className="board-card item card">
                        <div className="title-name ">
                            <figure className="board-img img-boxart">

                                <Link to={`/board/${board._id}`}><img
                                    className="img-art"
                                    data-id={board._id}
                                    src={board.contentURL}
                                    alt={board.contentDescription}
                                    title={board.contentDescription}
                                    value = {board._id}/>{board.boardTitle}
                                </Link>

                            </figure>
                            <div className="board-body-text">
                                <h3 className="board-title">{board.boardTitle}</h3>
                                <p className="board-info">{board.category}</p>
                                <br />


                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                
                <Header />
                
                <div className="container">
                    <div className="col-sm-12">
                        { /* This is what actually generates the images */ }
                        <div className="dashboard-background">
                            <h1 className="dashboard-header">Dashboard</h1>
                        </div>
                        <div className="full-background">
                            { this.state.selectedBoard ? <Board something={this.state.selectedBoard}/>:<div></div>}
                            { this.generateImage() }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;
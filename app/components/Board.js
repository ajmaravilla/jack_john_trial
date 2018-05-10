// ----------------------------
// import dependencies
// ----------------------------
import React, {Component} from 'react';
import helpers from "../utils/helpers";
import { withRouter } from 'react-router-dom'
import jwtDecode from "jwt-decode";

import Header from './layout/Header.js';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentBoard: null,
      comments: '',
      newComment: ''
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    this.setUser();
    const { match } = this.props;
    helpers.getOneBoard({
      id: match.params.id
    }).then((res) => {
      this.setState({currentBoard: res})
    })
  }

  setUser() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decodeToken = jwtDecode(token);
      this.setState({ user: decodeToken.name })
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    //console.log(this.state.newComment)
    //console.log("id is " + e.target.dataset.id)
    helpers.postComment({id: e.target.dataset.id, author: this.state.user, text: this.state.newComment})
    .then((result) => {
      this.setState({newComment: ''});
      const { match } = this.props;
      helpers.getOneBoard({
        id: match.params.id
      }).then((res) => {
        //console.log("res is " + JSON.stringify(res));
        this.setState({currentBoard: res})
        //console.log("this state is: " + this.state.currentBoard)
        })
    })
  }

  handleReplySubmit(e) {
    e.preventDefault()
    //console.log(this.newReply.value)
    //console.log("id is " + e.target.dataset.id)
    helpers.postReply({id: e.target.dataset.id, author: this.state.user, text: this.newReply.value})
    .then((result) => {
      this.newReply.value = "";
      const { match } = this.props;
      helpers.getOneBoard({
        id: match.params.id
      }).then((res) => {
        //console.log("res is " + JSON.stringify(res));
        this.setState({currentBoard: res})
        //console.log("this state is: " + this.state.currentBoard)
        })
      })
  }

  renderBoard() {
    const board = this.state.currentBoard.data;
    return (
      <div className="container currentContent col-md-8 col-centered">
        <center>
          <h1>{board.boardTitle}</h1>
          <img src={board.contentURL} height="200"/>
          <p className="contentDescription">{board.contentDescription}</p>
        </center>
        <div className="commentContent">
          {board.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <h3>{comment.text} - {comment.author}</h3>
              <div>{comment.replies.map((reply) => {
                return (
                  <div key={reply._id}>
                  <h4>{reply.text} - {reply.author}</h4>
                  </div>
                )
              })}
              </div>

            <form>
              <div className="form-group">
                <h5 htmlFor="name">Reply:</h5>
                  <input
                    /*reply form is not a controlled component to avoid same text repeated in all reply fields*/
                    className="form-control"
                    ref={input => this.newReply = input}
                    /*value={this.state.newReply}
                    name="newReply"
                    onChange={this.onChange}*/
                    required />
              </div>
              <center>
              <button
                data-id={comment._id}
                onClick={this.handleReplySubmit}
                className="btn replyBtn">
                Reply
              </button>
              </center>
            </form>
            </div>
          )
        })}
        </div>
        <form>
          <div className="form-group">
            <br />
            <h5 htmlFor="name">Comment:</h5>
            <textarea
              className="form-control"
              rows="5"
              value={this.state.newComment} // input is now a controlled component, value set by state
              name="newComment"
              onChange={this.onChange}
              required />
          </div>
          <center>
          <button
            data-id={board._id}
            onClick = {this.handleSubmit}
            className="btn commentBtn">
            Submit
          </button>
          </center>
        </form>
      </div>
    )
  }

  render() {
    const { match } = this.props;
    return (
      <div className="">
        <div className="header">
          <Header />
        </div>
        {this.state.currentBoard ? this.renderBoard():<div>loading...</div>}
      </div>
    );
  }

};

export default withRouter(Board);
// ******************************************************************************
// routes.js
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");

router.get("/boards", function(req, res) {

	Board.find({}).exec(function(err, doc) {
	    if (err) {
	      console.log(err);
	    }
	    else {
	      res.send(doc);
	    }
  	});
});

router.get("/boards/:id", function(req, res) {

	Board.findOne({ _id : req.params.id }).populate({
		"path":"comments",
		"populate": {
			"path":"replies",
			"model":"Reply"
		}
	}).sort({"date": 1}).then( function(db) {

  		res.json(db)
  	})
});


router.post("/boards", function(req, res) {

	const newBoard = new Board(req.body);
	//console.log(req.body);

    newBoard.save((err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
            res.json(data);
        }

    });
});

router.post("/boards/comment/:id", function(req, res) {
	console.log(req.body);
		// Use our Comment model to make a new comment from the req.body
	var newComment = new Comment(req.body);
	// Save the new comment to mongoose
	newComment.save(function(error, doc) {
		if (error) {
  			res.sendStatus(400);
  			//res.send(error);
  		} else {

		    // Find our article and push the new comment id into the board's comments array
		    Board.findOneAndUpdate({"_id": req.params.id}, { $push: { "comments": doc._id } }, { new: true }, function(err, newdoc) {
		        res.end();
		    });
		}
	});
});

router.post("/boards/reply/:id", function(req, res) {
	console.log(req.body);
		// Use our Reply model to make a new reply from the req.body
	var newReply = new Reply(req.body);
	// Save the new reply to mongoose
	newReply.save(function(error, doc) {
		if (error) {
  			res.sendStatus(400);
  			//res.send(error);
  		} else {

		    // Find our article and push the new comment id into the comment's replies array
		    Comment.findOneAndUpdate({"_id": req.params.id}, { $push: { "replies": doc._id } }, { new: true }, function(err, newdoc) {
		        res.end();
		    });
		}
	});
});

module.exports = router;
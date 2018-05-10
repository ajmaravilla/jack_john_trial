// ******************************************************************************
// Board.js
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var mongoose = require('mongoose');

// =============================================================
// *** Create Schema
// =============================================================
var Schema = mongoose.Schema;

var newBoard = new Schema ({
	boardTitle: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	contentURL: {
		type: String,
		required: true
	},
	contentDescription: {
		type: String,
		required: true
	},
	openUntil: {
		type: Date,
	},
	isPublic: {
	    type: Boolean,
	    default: true
  	},
  	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});


// =============================================================
// *** Create Board Model
// =============================================================
var Board = mongoose.model('Board', newBoard);

// =============================================================
// *** Export the Board Model
// =============================================================
module.exports = Board;
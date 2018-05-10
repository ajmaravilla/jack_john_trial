const mongoose = require("mongoose");

module.exports.connect = (uri) => {
	mongoose.connect(uri);
	mongoose.Promise = global.Promise;

	mongoose.connection.on("error", (err) => {
		console.error(`Mongoose connection error: ${err}`);
		process.exit(1);
	});

	mongoose.connection.once("open", () => {
		console.log("Mongoose connection successful.");
	});

	// Load models
	require("./Account");
	require("./Comment");
	require("./Reply");
}
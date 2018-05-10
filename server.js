//Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");


const databaseString = process.env.MONGODB_URI || "mongodb://localhost/contentclub";
require("./server/models").connect(databaseString);

const app = express();
const PORT = process.env.PORT || 3000;

//logging and setting up bodyparser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "*/*" }));

app.use(passport.initialize());
const localSignupStrategy = require("./server/passport/local-signup");
const localLoginStrategy = require("./server/passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

const authCheckMiddleware = require("./server/middleware/auth-check");
app.use("/api", authCheckMiddleware);

//using static public folder
app.use(express.static('./server/static/'));

//Importing Routes
const authRoutes = require("./server/controllers/auth.js");
const apiRoutes = require("./server/controllers/api");
const routes = require("./server/controllers/routes.js");
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/", routes);

app.listen(PORT, function() {
	console.log(`Server Running on Port: ${PORT}`);
});
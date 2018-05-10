const express = require("express");
const passport = require("passport");
const Account = require("../models/account");
const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

router.post("/register", (req, res) => {
    console.log(req.body);
    Account.register(new Account(
        { username: req.body.username}),
        req.body.password,
        (err, account) => {
            if (err) {
                return res.send({ account : account });
        }

        passport.authenticate("local")(req, res, () => {
            res.redirect("/login");
        });
    });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.redirect("#/dashboard");
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});



module.exports = router;
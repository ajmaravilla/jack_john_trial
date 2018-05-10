const Account = require("mongoose").model("Account");
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, username, password, done) => {
	const accountData = {
		username: username.trim(),
		password: password.trim(),
    };

    const newAccount = new Account(accountData);
    newAccount.save((err) => {
        if (err) { return done(err); }
        return done(null);
    });
});
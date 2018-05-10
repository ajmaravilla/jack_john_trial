const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const Account = new Schema({
	username: String,
	password: String
});

Account.methods.comparePassword = function comparePassword(password, callback) { bcrypt.compare(password, this.password, callback);
};

Account.pre("save", function saveHook(next) {
	const user = this;

	if (!user.isModified("password")) return next();

	return bcrypt.genSalt((saltError, salt) => {
		if (saltError) { return next(saltError); }

		return bcrypt.hash(user.password, salt, (hashError, hash) => {
			if (hashError) { return next(hashError); }

			user.password = hash;

			return next();
		});
	});
});

module.exports = mongoose.model("Account", Account);
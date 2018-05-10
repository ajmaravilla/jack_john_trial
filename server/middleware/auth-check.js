const jwt = require("jsonwebtoken");
const Account = require("mongoose").model("Account");
const config = require("../../config");

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(" ")[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) { return res.status(401).end(); }

        const accountId = decoded.sub;

        return Account.findById(accountId, (accountErr, account) => {
            if (accountErr || !account ) {
                return res.status(401).end();
            }

            return next();
        })
    })
}
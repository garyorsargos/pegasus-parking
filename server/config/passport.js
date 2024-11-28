const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/user');

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        async (userName, password, cb) => {
            try {
                const user = await Users.findOne({ userName: userName });
                if (!user) {
                    return cb(null, false, { message: 'Username not found.' });
                }
                // hashes password with sha2-256 encryption using a randomly generated user's salt value to make it more secure from rainbow tables
                const valid = await user.authenticate(password);
                if (!valid) {
                    return cb(null, false, { message: "Incorrect Password." });
                }
                return cb(null, user);
            } catch (error) {
                return cb(error);
            }
        }
    ));

    passport.serializeUser((user, cb) => {
        process.nextTick(function () {
            cb(null, user.userId);
        })
    });

    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await Users.findOne({ userId: id });
            if (!user) {
                return cb(new Error('User not found.'));
            }
            process.nextTick(function () {
                return cb(null, user);
            });
        }
        catch (error) {
            cb(error);
        }
    });
};

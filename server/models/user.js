const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const autoIncrement = require('mongoose-sequence')(mongoose);
const PermitSchema = require('./permit').schema;
var crypto = require('crypto');

//This is all the user information that will be store
//I have removed all the old users so we dont have any problems when doing user look ups
//bellow I have some userNames and password that you can use to test the API
// gerbTheMan:COP4331Lab
// john_doe: john_doe
// peakCartoon: 1234
// GameTheory: justATheory
const UserSchema = new Schema({
    userId: {
        type: Number,
        unique: true,
    },
    firstName: {
        type: String,
        maxLength: 50,
    },
    lastName: {
        type: String,
        maxLength: 50,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        maxLength: 50,
    },
    //This field will make a reference to permits that are stored in the permits collection
    permits: [
        { type: Schema.Types.ObjectId, ref: 'Permit' }
    ],
});

//I imported mongoose-sequencep to set an incrementing userId value,
//The import adds a extra field called "__v" in the Users collection
UserSchema.plugin(autoIncrement, { inc_field: 'userId' });

//this section runs the code inside when a new User is created
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = await this.passwordHash(this.password);
        return next();
    } catch (error) {
        return next(error);
    }
});

//This methods are used to help password encryption
UserSchema.methods = {
    passwordHash: function (password) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, this.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
                if (err) reject(err);
                resolve(hashedPassword.toString('hex'));
            });
        });
    },
    authenticate: async function (password) {
        const hashedPassword = await this.passwordHash(password);
        return hashedPassword == this.password;
    },
};

module.exports = model("Users", UserSchema, "Users");
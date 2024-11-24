const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const autoIncrement = require('mongoose-sequence')(mongoose);
var crypto = require('crypto');

//This is all the user information that will be store
const UserSchema = new Schema({
    userId: {
        type:Number,
        unique:true,
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
        maxLength:50
    }
});

//I imported mongoose-sequencep to set an incrementing userId value,
//The import adds a extra field called "__v" in the Users collection
UserSchema.plugin(autoIncrement, { inc_field: 'userId' });

//this section runs the code inside when a new User is created
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
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
    passwordHash: function(password) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, this.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
               if (err) reject(err);
               resolve(hashedPassword.toString('hex'));
            });
         });
    },
    authenticate: async function(password) {
        const hashedPassword = await this.passwordHash(password);
        return hashedPassword == this.password;
    },
    
};

module.exports = model("Users", UserSchema, "Users");
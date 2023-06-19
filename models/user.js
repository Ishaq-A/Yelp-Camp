const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Adds Username, Password To Schema
// Ensures Username Is Unique
// Provides Additional Methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);


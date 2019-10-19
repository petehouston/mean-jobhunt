require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const salt = parseInt(process.env.BCRYPT_SALT) || 10;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        index: {
            unique: true,
        },
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
});

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);


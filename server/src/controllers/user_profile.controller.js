require('dotenv').config();
const userModel = require("../models/user.model");
const { ObjectId } = require('mongoose').mongo.ObjectId;
const { STATUS_SUCCESS, STATUS_ERROR } = require('../common/constants');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.BCRYPT_SALT) || 10;

function getProfile(req, res, next) {
    userModel.findOne({
        _id: req.body.authUser._id,
    }, (err, doc) => {
        if (err) { 
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: doc
            });
        }
    })
}

function changePassword(req, res, next) {
    userModel.findOneAndUpdate({
        _id: ObjectId(req.body.authUser._id),
    }, {
        password: bcrypt.hashSync(req.body.password, salt),
    }, (err, doc) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: {
                    message: 'Password has been changed successfully'
                }
            });
        }
    });
}

module.exports = {
    getProfile,
    changePassword,
}

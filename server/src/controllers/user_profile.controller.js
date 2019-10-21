const userModel = require("../models/user.model");
const { ObjectId } = require('mongoose').mongo.ObjectId;
const { STATUS_SUCCESS, STATUS_ERROR } = require('../common/constants');

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

module.exports = {
    getProfile,
}
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const { SECRET_KEY, STATUS_ERROR, STATUS_SUCCESS } = require('../common/constants');

const HEADER_X_ACCESS_TOKEN = 'x-access-token';

module.exports = (req, res, next) => {
    jwt.verify(req.headers[HEADER_X_ACCESS_TOKEN], req.app.get(SECRET_KEY), (err, decoded) => {
        if (err) {
            res.json({
                status: STATUS_ERROR,
                payload: {
                    message: err
                }
            });
        } else {
            userModel.findById(decoded.id, (err, user) => {
                if (err) {
                    next(err);
                } else {
                    req.body.authUser = user;
                    next();
                }
            });
        }
    });
};

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { STATUS_SUCCESS, STATUS_ERROR, SECRET_KEY } = require('../common/constants');


const registerController = (req, res, next) => {
    userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: {
                    message: 'user account created successfully'
                }
            });
        }
    })
};

const loginController = (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (err || user == null) {
            next(err);
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ id: user._id }, req.app.get(SECRET_KEY), { expiresIn: '24h' });
                res.json({
                    status: STATUS_SUCCESS,
                    payload: {
                        access_token: token
                    }
                });
            } else {
                res.status(400).json({
                    status: STATUS_ERROR,
                    payload: {
                        message: 'invalid credentials'
                    }
                })
            }
        }
    })
};

module.exports = {
    login: loginController,
    register: registerController,
};

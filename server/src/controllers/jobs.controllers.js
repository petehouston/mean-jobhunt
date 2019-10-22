const jobModel = require('../models/job.model');
const { STATUS_SUCCESS } = require('../common/constants');
const { ObjectId } = require('mongoose').mongo;

function getInfo(req, res, next) {
    jobModel.findOne({
        _id: ObjectId(req.params.job_id),
        is_published: true,
    }, {
        __v: 0,
        user_id: 0,
    }).exec((err, doc) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: doc,
            });
        }
    });
}

function getByLatest(req, res, next) {
    jobModel.find({
        is_published: true,
    })
        .sort({ created_at : -1, _id: -1 })
        .limit(10)
        .exec((err, docs) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: STATUS_SUCCESS,
                    payload: {
                        jobs: docs,
                    }
                })
            }
        });
}

function getByVisaSponsor(req, res, next) {
    jobModel.find({
        visa_sponsor: true,
        is_published: true,
    }).sort({
        _id: -1,
        created_at: -1,
    }).limit(10)
        .exec((err, docs) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: STATUS_SUCCESS,
                    payload: {
                        jobs: docs,
                    }
                })
            }
        });
}

function getByRemote(req, res, next) {
    jobModel.find({
        is_remote: true,
        is_published: true,
    }).sort({
        _id: -1,
        created_at: -1,
    }).limit(10)
        .exec((err, docs) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: STATUS_SUCCESS,
                    payload: {
                        jobs: docs,
                    }
                })
            }
        });
}

function getByHighSalary(req, res, next) {
    jobModel.find({
        is_remote: true,
        is_published: true,
    }).sort({
        _id: -1,
        salary_range: -1,
        created_at: -1,
    }).limit(10)
        .exec((err, docs) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: STATUS_SUCCESS,
                    payload: {
                        jobs: docs,
                    }
                })
            }
        });
}



module.exports = {
    get: getInfo,
    getByLatest,
    getByVisaSponsor,
    getByRemote,
    getByHighSalary,
};

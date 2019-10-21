const jobModel = require('../models/job.model');
const { STATUS_SUCCESS } = require('../common/constants');

function getInfo(req, res, next) {
    jobModel.findOne({
        _id: req.params.job_id
    }, {
        __v: 0,
        user_id: 0,
    }).exec((err, doc) => {
        if (err) {
            next(err);
        } else {
            delete doc['user_id'];
            delete doc['__v'];
            res.json({
                status: STATUS_SUCCESS,
                payload: doc,
            });
        }
    });
}

function latest(req, res, next) {
    jobModel.find({})
        .sort({ created_at : -1, _id: -1 })
        .limit(2)
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
    getByLatest: latest,
};

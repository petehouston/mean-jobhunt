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


module.exports = {
    get: getInfo,
};

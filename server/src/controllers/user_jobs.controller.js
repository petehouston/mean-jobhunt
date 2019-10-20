const jobModel = require('../models/job.model');
const { ObjectId } = require('mongoose').mongo;
const { STATUS_SUCCESS, STATUS_ERROR } = require('../common/constants');

function createJob(req, res, next) {
    const {title, company, is_remote, job_type, visa_sponsor, salary_range} = req.body;
    jobModel.create({
        title,
        company,
        is_remote,
        job_type,
        visa_sponsor,
        salary_range,
        user_id: ObjectId(req.body.authUser._id),
    }, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: {
                    message: 'job added successfully'
                }
            })
        }

    })
}

module.exports = {
    create: createJob,
};

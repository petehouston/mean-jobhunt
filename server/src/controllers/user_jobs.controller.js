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

function addDescription(req, res, next) {
    const description = req.body.description;
    const jobId = req.params.job_id;
    jobModel.findOneAndUpdate({
        _id: ObjectId(jobId)
    }, {
        description
    }, {
      new: true,
    }, (err, doc) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: {
                    job: doc
                }
            });
        }
    });
}

function addRequirement(req, res, next) {
    const requirement = req.body.requirement;
    const jobId = req.params.job_id;
    jobModel.findOneAndUpdate({
        _id: ObjectId(jobId)
    }, {
        requirement
    }, {
        new: true,
    }, (err, doc) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: {
                    job: doc
                }
            });
        }
    });
}

module.exports = {
    create: createJob,
    addDescription,
    addRequirement,
};

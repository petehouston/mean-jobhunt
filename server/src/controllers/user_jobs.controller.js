const jobModel = require('../models/job.model');
const jobAppModel = require('../models/job_application.model');
const { ObjectId } = require('mongoose').mongo;
const { STATUS_SUCCESS, STATUS_ERROR } = require('../common/constants');

function createJob(req, res, next) {
    const {title, company, location, is_remote, job_type, visa_sponsor, salary_range} = req.body;
    jobModel.create({
        title,
        company,
        location,
        is_remote,
        job_type,
        visa_sponsor,
        salary_range,
        user_id: ObjectId(req.body.authUser._id),
        created_at: new Date().toISOString(),
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

function list(req, res, next) {
    jobModel.find({ user_id: ObjectId(req.body.authUser._id)}).sort({ _id: -1 }).exec((err, docs) => {
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

function edit(req, res, next) {
    const { title, company, location, is_remote, job_type, visa_sponsor, salary_range, description, requirement } = req.body;

    jobModel.findOneAndUpdate({
        _id: req.params.job_id,
    }, {
        title,
        company,
        location,
        is_remote,
        job_type,
        visa_sponsor,
        salary_range,
        description,
        requirement,
    }, { new: true }, (err, doc) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: doc,
            })
        }
    });
}

function getInfo(req, res, next) {
    jobModel.findOne({
        _id: ObjectId(req.params.job_id)
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

function publish(req, res, next) {
    const jobId = req.params.job_id;
    jobModel.findOneAndUpdate({
        _id: ObjectId(jobId)
    }, {
        is_published: true,
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

function unpublish(req, res, next) {
    const jobId = req.params.job_id;
    jobModel.findOneAndUpdate({
        _id: ObjectId(jobId)
    }, {
        is_published: false,
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

function getJobApps(req, res, next) {
    jobAppModel.find({
        job_id: ObjectId(req.params.job_id),
    }).sort({
        _id: -1
    }).exec((err, docs) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: STATUS_SUCCESS,
                payload: {
                    applications: docs,
                }
            });
        }
    })
}

module.exports = {
    create: createJob,
    addDescription,
    addRequirement,
    list,
    edit,
    getInfo,
    publish,
    unpublish,
    getJobApps,
};

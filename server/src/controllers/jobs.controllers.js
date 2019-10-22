require('dotenv').config();
const jobModel = require('../models/job.model');
const jobApplicationModel = require('../models/job_application.model');
const { STATUS_SUCCESS } = require('../common/constants');
const { ObjectId } = require('mongoose').mongo;
const multer = require('multer');
const path = require('path');
const uploader = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, process.env.PUBLIC_PATH);
        },
        filename: (req, file, cb) => {
            const fname = Date.now() + '.' + file.originalname.split('.').pop();
            const resumeUrl = `assets/${fname}`;
            req.resume_url = resumeUrl;
            cb(null, fname);
        },
    }),
});

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

function applyJob(req, res, next) {
    console.log('here');
    let resumeUpload = uploader.single('resume');
    resumeUpload(req, res, err => {
        if (err) {
            next(err);
        } else {
            jobApplicationModel.create({
                name: req.body.name,
                email: req.body.email,
                resume_url: req.resume_url,
                job_id: ObjectId(req.params.job_id),
            }, (err, doc) => {
                if (err) {
                    next(err);
                } else {
                    res.json({
                        status: STATUS_SUCCESS,
                        payload: {
                            message: 'Applied successfully'
                        }
                    });
                }
            });
        }

    });

}

module.exports = {
    get: getInfo,
    getByLatest,
    getByVisaSponsor,
    getByRemote,
    getByHighSalary,
    applyJob,
};

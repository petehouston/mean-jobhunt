require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const salt = parseInt(process.env.BCRYPT_SALT) || 10;

const JobSchema = new Schema({
    title: {
        type: String, trim: true, required: true,
    },
    company: {
        type: String, trim: true, required: true,
    },
    location: {
        type: String, trim: true, required: true,
    },
    is_remote: {
        type: Boolean, default: false,
    },
    job_type: {
        type: Number, default: 0,
    },
    visa_sponsor: {
        type: Boolean, default: false,
    },
    salary_range: {
        type: Number, default: 0,
    },
    description: {
        type: String, trim: true, required: false,
    },
    requirement: {
        type: String, trim: true, required: false,
    },
    is_published: {
        type: Boolean, default: false,
    },
    user_id: {
        type: Schema.Types.ObjectId, required: true, ref: 'users',
    },
    created_at: {
        type: Date, required: true,
    }
});


module.exports = mongoose.model('Job', JobSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobApplicationSchema = new Schema({
    name: {
        type: String, trim: true, required: true,
    },
    email: {
        type: String, trim: true, required: true,
    },
    resume_url: {
        type: String, trime: true, required: true,
    },
    job_id: {
        type: Schema.Types.ObjectId, required: true, ref: 'jobs',
    },
    created_at: {
        type: Date, required: true, default: Date.now(),
    }
});


module.exports = mongoose.model('JobApplication', JobApplicationSchema);


require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("./config/database");
const authRouter = require('./routes/auth.api');
const userJobsRouter = require('./routes/user_jobs.api');
const jobsRouter = require('./routes/jobs.api');
const userProfileRouter = require('./routes/user_profile.api');
const mwIsAuth = require('./middleware/is_authenticated.middleware');
const { SECRET_KEY, STATUS_ERROR } = require('./common/constants');

// Start database connection
mongoose.connection.on('error', console.error.bind(console, 'Database connection error!!!'));
const app = express();

/////////////////////////////////////////
// CONFIG
/////////////////////////////////////////
app.set(SECRET_KEY, process.env.SECRET_KEY || 'MeanJobHuntSecretKey');

/////////////////////////////////////////
// MIDDLEWARE
/////////////////////////////////////////
app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(process.env.PUBLIC_PATH));
/////////////////////////////////////////
// ROUTING
/////////////////////////////////////////
app.use('/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/u/jobs', mwIsAuth, userJobsRouter);
app.use('/api/u/profile', mwIsAuth, userProfileRouter);

/////////////////////////////////////////
// ERROR HANDLER
/////////////////////////////////////////
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        status: STATUS_ERROR,
        payload: {
            error: err
        }
    });
});

/////////////////////////////////////////
// START SERVER
/////////////////////////////////////////
app.listen(process.env.SERVER_PORT || 3000,
    () => console.log(`Server started at http://localhost:${process.env.SERVER_PORT || 3000}`));

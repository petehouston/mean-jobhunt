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
            console.log('===== ' + resumeUrl);
            req.body.resume_url = resumeUrl;
            cb(null, fname);
        },
    }),
});

module.exports =  uploader.single('resume');

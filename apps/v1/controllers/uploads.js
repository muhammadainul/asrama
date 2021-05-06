'use strict'

const multer = require('multer')
const path = require('path')
const moment = require('moment')

const imageFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        cb("Only image file allowed.", false);
    } else {
        cb(null, true);
    }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  "./assets/images/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;
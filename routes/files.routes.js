const path = require('path');
const fs = require('fs');

const {Router} = require('express');
const multer = require('multer');
const FileSystem = require('../models/FileSystem');

const router = new Router();

const storage = multer.diskStorage({
    destination: './public/uploads'
});

const upload = multer({
    storage
});

module.exports = router;
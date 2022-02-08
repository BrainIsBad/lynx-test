const path = require('path');
const fs = require('fs');

const {Router} = require('express');
const multer = require('multer');
const FileSystem = require('../models/FileSystem');

const router = new Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join('./public/uploads'));
    },
    filename(req, file, cb) {
        const fileName = Date.now() + file.originalname;

        cb(null, fileName.replace(/:/g, '-'));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/upload', upload.array('files[]', 10), async (req, res) => {

    const uploadedFiles = [];
    const messages = [];

    for (const file of req.files) {
        try {
            const buffer = fs.readFileSync(file.path);
            const {filename, size} = file;

            const model = new FileSystem({
                filename, size, buffer
            });

            const uploadedFile = await model.save();

            if (uploadedFile) {
                fs.unlinkSync(file.path);
                uploadedFiles.push(uploadedFile);
            }
        } catch (e) {
            messages.push(e.message);
        }
    }

    return res.status(200).json({uploadedFiles, messages});
});

router.get('/', async (_, res) => res.status(200).json({
    files: await FileSystem.find()
}));

router.delete('/:id', async (req, res) => {
    const file = await FileSystem.findById(req.params.id);

    if (file) {
        return res.status(200).json({
            success: await file.remove()
        });
    }

    return res.status(404).json({message: 'File has not found'});
})

module.exports = router;
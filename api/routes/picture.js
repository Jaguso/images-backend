const express = require('express');
const router = express.Router();
const PictureController = require('../controllers/picture');
const checkAuth = require('../middleware/check-auth');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage});


router.post('/', checkAuth, upload.single('picture'), PictureController.picture_create);
router.get('/', PictureController.picture_get_all);

module.exports = router;
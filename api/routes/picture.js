const express = require('express');
const router = express.Router();
const PictureController = require('../controllers/picture');
const checkAuth = require('../middleware/check-auth');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});



//misshing checkAuth
router.post('/', upload.single('picture'), PictureController.picture_create);
router.get('/', PictureController.picture_get_all);

module.exports = router;
const express = require('express');
const router = express.Router();
const PictureController = require('../controllers/picture');
const checkAuth = require('../middleware/check-auth');


router.post('/', checkAuth,  PictureController.picture_create);
router.get('/', PictureController.picture_get_all);
router.get('/:pictureId', PictureController.get_one_picture);
router.delete('/:pictureId', checkAuth, PictureController.picture_delete);

module.exports = router;
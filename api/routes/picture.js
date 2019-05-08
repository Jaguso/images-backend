const express = require('express');
const router = express.Router();
const PictureController = require('../controllers/picture');

router.post('/', PictureController.picture_create);
router.get('/', PictureController.picture_get_all);

module.exports = router;
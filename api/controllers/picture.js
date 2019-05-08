const mongoose = require('mongoose');

const Picture = require('../models/picture');
const User = require('../models/user');

exports.picture_create = (req, res, next) => {

    const picture = new Picture({
        _id: new mongoose.Types.ObjectId(),
        picture: req.body.picture,
        description: req.body.description
    });
    picture.save()
        .then(result => {
            console.log(result); 
            res.status(201).json({
                message: 'Picture created successfully'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
}


exports.picture_get_all = (req, res, next) => {
    Picture.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
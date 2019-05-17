const mongoose = require('mongoose');
const Picture = require('../models/picture');


exports.picture_create = (req, res, next) => {
    const picture = new Picture({
        _id: new mongoose.Types.ObjectId(),
        picture: req.body.picture,
        title: req.body.title,
        description: req.body.description,
        user: req.body.user
    });
    picture.save()
        .then(result => {
            console.log(result); 
            res.status(201).json({
                message: 'Picture created successfully',
                pictureId: result._id
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


exports.get_one_picture = (req, res, next) => {
    const id = req.params.pictureId;
    Picture.findById(id)
        .select('_id picture description title user')
        .exec()
        .then(doc => {
            console.log("From data base", doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({message: 'No valid entry found for provided id'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}


exports.picture_delete = (req, res, next) => {
    const id = req.params.pictureId;
    Picture.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Picture deleted',
                id: id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
}

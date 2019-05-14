const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result); //this prints user json on the console
                                const token = jwt.sign({
                                    name: user.name,
                                    email: user.email,
                                    userId: user._id
                                    }, 
                                    process.env.JWT_KEY,
                                    { expiresIn: "24h" }
                                );
                                res.status(201).json({
                                    message: 'User created successfully',
                                    token: token
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                
                });
            }
        })  
}


exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            //next is using bcrypt to compare passwords 
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    //first parameter defines the information that the jwt encodes
                    const token = jwt.sign({
                        name: user[0].name,
                        email: user[0].email,
                        userId: user[0]._id
                        }, 
                        process.env.JWT_KEY,
                        { expiresIn: "24h" }
                    );
                    return res.status(200).json({
                        message: 'Auth successfull',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
}

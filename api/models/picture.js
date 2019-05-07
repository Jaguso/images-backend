const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    picture: { type: String, required: true, ref: 'User' },
    description: { type: String }    
});

module.exports = mongoose.model('Picture', pictureSchema);


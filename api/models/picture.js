const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    picture: [{ type: String }],
    title: { type: String },
    description: { type: String }, 
    user: { type: String }    
});

module.exports = mongoose.model('Picture', pictureSchema);


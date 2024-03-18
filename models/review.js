const mongoose = require ('mongoose');

const Schema = mongoose.Schema; //shortcut

//new Schema
const ReviewSchema = new Schema({

user: {
    type: String,
}, 

body: {
    type: String,
},
rating: {
    type: Number,
    required: true
},
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}

});

//compile and export
module.exports = mongoose.model('Review', ReviewSchema)
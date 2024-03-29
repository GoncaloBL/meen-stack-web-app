const mongoose = require('mongoose');
const Review = require('./review')

const Schema = mongoose.Schema; //shortcut

//new Schema

const ProductSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    price: Number,
    description: String,
    location: String,
    coordinates: [Number],
    image: [String],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

//mongoose middleware (delete associated reviews after product deleted)
ProductSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        console.log(' => mongoose model middleware (PRODUCT): deleting all reviews in product')
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

//compile and export
module.exports = mongoose.model('Product', ProductSchema)

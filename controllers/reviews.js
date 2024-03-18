//require Mongo Model from separate file
const Product = require('../models/product')
const Review = require('../models/review')

//ERROR HANDLING
const AppError = require('../utilities/AppError');

module.exports.createReview = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)
        let newReview = new Review(req.body.review)
        newReview.author = req.session.user._id
        product.reviews.push(newReview)
        await newReview.save()
        await product.save()

        req.flash('success', 'Thank you for your opinion')
        res.redirect(`/product/${product.id}`)
    } catch (e) {
        next(e);
    }
}

module.exports.deleteReview = async (req, res, next) => {
    try {
        //console.log(req.params)

        //delete notation product.review

        let product = await Product.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } })
        let review = await Review.findByIdAndDelete(req.params.reviewId)

        res.redirect(`/product/${product.id}`)
    } catch (e) {
        next(e);
    }
}
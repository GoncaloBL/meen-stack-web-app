const Joi = require('joi');
//ERROR HANDLING
const AppError = require('./AppError');

//require Mongo Model from separate file
const Product = require('../models/product')
const Review = require('../models/review')

//middleware test
module.exports.middlewareNEW = (req, res, next) => {
    console.log('middleware being run on /new')
    next()
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        req.session.returnTo = req.originalUrl;//save user's last path before redirect to login
        req.flash('error', 'You must be signed in')
        return res.redirect('/login')
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!req.session.user || !product.author.equals(req.session.user._id)) {
        req.flash('error', 'You do not have permission to edit that!')
        res.redirect(`/product/${product.id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let review = await Review.findById(req.params.reviewId)
    if (!req.session.user || !review.author.equals(req.session.user._id)) {
        req.flash('error', 'You do not have permission to delete that!')
       return res.redirect(`/product/${req.params.id}`)
    }
    next();
}

//JOI VALIDATION MIDDLEWARE
module.exports.validateData = (req, res, next) => {
    const joiSchema = Joi.object({
        Product: Joi.object({
            title: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().min(0),
            image: Joi.string().allow(''),
        }).required()
    })
    const result = joiSchema.validate(req.body)
    if (result.error) {
        //PROBLEM: DETAILS IS ARRAY OF OBJECTS
        const msg = result.error.details.map(el => el.message).join(',')
        //console.log(msg)
        throw new AppError(400, msg)
    }
    else {
        next();
    }
}

//validation middleware
module.exports.validateReview = (req, res, next) => {
    const joiSchema = Joi.object({
        review: Joi.object({
            user: Joi.string().allow(''),
            body: Joi.string().required(),
            rating: Joi.number().min(0),
        }).required()
    })
    const result = joiSchema.validate(req.body)
    if (result.error) {
        //PROBLEM: DETAILS IS ARRAY OF OBJECTS
        const msg = result.error.details.map(el => el.message).join(',')
        //console.log(msg)
        throw new AppError(400, msg)
    }
    else {
        next();
    }
}
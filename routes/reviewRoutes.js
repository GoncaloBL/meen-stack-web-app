const express = require('express');
const router = express.Router({mergeParams: true})
const AppError = require('../utilities/AppError')
//IMPORTS from app.js
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');

//require Mongo Model from separate file
const Product = require('../models/product')
const Review = require('../models/review')

//UTILITIES
const { isLoggedIn, isAuthor, isReviewAuthor, middlewareNEW, validateData, validateReview } = require('../utilities/middleware');
const reviews = require('../controllers/reviews');

//ERROR HANDLING


//REVIEWS
router.post('/', isLoggedIn, validateReview, reviews.createReview )
router.delete('/:reviewId',isLoggedIn, isReviewAuthor, reviews.deleteReview)

module.exports = router;

const express = require('express');
const router = express.Router()
const AppError = require('../utilities/AppError')
//IMPORTS from app.js
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { storage } = require('../cloudinary') //cloudinary config
const { cloudinary } = require('../cloudinary')
const multer = require('multer') //parse form files
const upload = multer({ storage }) //upload form files


const Joi = require('joi');

//require Mongo Model from separate file
const Product = require('../models/product')
const Review = require('../models/review')

//UTILITIES
const { isLoggedIn, isAuthor, middlewareNEW, validateData, validateReview } = require('../utilities/middleware');
const products = require('../controllers/products');

//INDEX
router.get('/', products.index)

//NEW
router.get('/new', middlewareNEW, isLoggedIn, products.showNew)
router.post('/', upload.array('Product[image]'), validateData, products.createNew)
//validadeData

//SHOW
router.get('/:id', products.showByID)

//EDIT
router.get('/:id/edit', isLoggedIn, isAuthor, products.showEdit)
router.put('/:id', isLoggedIn, isAuthor, products.createEdit)
router.put('/:id/edit/images', isLoggedIn, isAuthor, upload.array('Product[image]'), async (req, res, next) => {
    try {
        let editProduct = await Product.findById(req.params.id)
        req.files.map((image, index) => (editProduct.image.push(image.path)));
        editProduct.author = req.session.user._id
        await editProduct.save()
        req.flash('success', 'New photos added')
        res.redirect(`/product/${editProduct.id}`)

    } catch (err) {
        next(err)
    }
})
router.delete('/:id/edit/images', async (req, res, next) => {
    try {
        let edited = await Product.findByIdAndUpdate(req.params.id, { $pull: {image: req.body.imageURL}} )
        //remove from cloudinary: cloudinary.uploader.destroy()
        res.redirect(`/product/${edited.id}/edit`)
    } catch (err) {
        next(err)
    }
})


//DELETE
router.delete('/:id', isLoggedIn, isAuthor, products.delete)


module.exports = router;
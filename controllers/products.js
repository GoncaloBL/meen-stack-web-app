//require Mongo Model from separate file
const Product = require('../models/product')
const Review = require('../models/review')

const mapToken = process.env.mapboxKEY;

module.exports.index = async (req, res, next) => {
    try {
        const data = await Product.find({})
        res.render('index', { data, title: 'Index' });
    } catch (e) {
        next(e)
    }
}

module.exports.showNew = (req, res) => {
    res.render('new', { title: 'Add to DB' })
}
module.exports.createNew = async (req, res, next) => {
    try {
        let newCamp = new Product(req.body.Product)
        //newCamp.image= req.file.path //replace img url from req.file
        req.files.map((image, index) => (newCamp.image[index] = image.path));
        newCamp.author = req.session.user._id


        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.Product.location}&limit=6.json?access_token=${mapToken}`)
        const coordinates = await response.json();
        newCamp.coordinates = coordinates.features[0].center


        console.log(newCamp)
        await newCamp.save()
        //   .then(data => console.log('added to db: ', data))

        req.flash('success', 'Created a new product, here it is')
        res.redirect(`product/${newCamp._id}`)
    }
    catch (e) {
        next(e);
    }
}
module.exports.showByID = async (req, res, next) => {
    try {
        //console.log(req.params)
        let itemShow = await Product.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author').populate()
        if (!itemShow) {
            req.flash('error', 'Could not find this id')
            //return res.redirect('/product')
            next(new AppError(401, 'Could not find such id'))
        } else {
            console.log(itemShow)
            res.render('show', { itemShow, title: 'Show Page' })
        }
    } catch (e) {
        next(e)
    }

}
module.exports.showEdit = async (req, res, next) => {
    try {
        //console.log(req.params);
        let data = await Product.findById(req.params.id)
        if (!data) {
            req.flash('error', 'Could not find this id')
            return res.redirect('/product')
        }
        res.render('edit', { data, title: 'Edit Page' })
    } catch (e) {
        next(e);
    }
}
module.exports.createEdit = async (req, res, next) => {
    try {
        //console.log(req.params);
        let edited = await Product.findByIdAndUpdate(req.params.id, req.body.Product, { new: true, runValidators: true })
        console.log(edited)
        req.flash('success', 'Successfuly updated!')
        res.redirect(`/product/${edited.id}`)
    } catch (err) {
        next(err)
    }
}
module.exports.delete = async (req, res, next) => {
    try {
        let { id } = req.params
        await Product.findByIdAndDelete(id)
        req.flash('success', 'Deleted successfuly')
        res.redirect('/product')
    } catch (e) {
        next(e)
    }
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
console.log(process.env.API_KEY)
console.log(process.env.CLOUD_NAME)


//IMPORTS
const colors = require('colors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Joi = require('joi');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const {storage} = require('./cloudinary') //cloudinary config
const multer  = require('multer') //parse form files
const upload = multer({ storage }) //upload form files

//UTILITIES
const { hashPassword, comparePassword } = require('./utilities/passwords')
const { isLoggedIn} = require('./utilities/middleware')

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'public')))//static files location
app.use(express.urlencoded({ extended: true })) //parsing req.body for forms
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser())
const sessionConfig = {
    secret: 'cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}
app.use(session(sessionConfig));
app.use(flash());


//routes import
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const userRoutes = require('./routes/userRoutes')

//require Mongo Model from separate file
const Product = require('./models/product')
const Review = require('./models/review')
const User = require('./models/user')


//MONGOOSE connection
const dbUrl = process.env.DB_URL; //get cloud database url from .env
//'mongodb://127.0.0.1:27017/ProjectMain' _____local database
main()
    .then(() => console.log('=> MONGO CONNECTION OPEN!'.green))
    .catch(err => {
        console.log('MONGO CONNECTION ERROR!!!'.red)
        console.log(err)
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ProjectMain');
}



//MIDDLEWARE
app.use('/', (req, res, next) => {
    console.log(req.method.yellow, req.path)
    //console.log(req.session.user_id)
    return next()
})


//Flash middleware + current user
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})



//SERVER LOGIC
app.get('/', (req, res) => {
    req.session.count += 1; // increase on request to page
    res.render('home', { title: 'Project Home', views: req.session.count})
})

app.get('/secret', isLoggedIn , (req, res) => {
    res.send('this can only be accessed with login')
})

app.use('/', userRoutes)
app.use('/product', productRoutes)
app.use('/product/:id/reviews', reviewRoutes) 




//ERROR HANDLING
const AppError = require('./utilities/AppError');
const { has } = require('langs');


/* app.use((req, res) => {
    res.status(404).send('404: PATH NOT FOUND')
}) */
//OR
app.all('*', (req, res, next) => {
    req.flash('error', 'Sorry, path not found')
    next(new AppError(404, 'PATH NOT FOUND'))
})

app.use((err, req, res, next) => {
    console.log('*ERROR*'.red)
    console.log('*******'.red)
    console.log(err.message)
    //console.log(err.name)
    next(err)
})
app.use((err, req, res, next) => {
    const { status = 500 } = err; //gives default value to status
    const { message = 'Something went wrong' } = err
    console.log(message)
    res.status(status).render('error', { err, title: 'Error' })
})



//LISTEN
app.listen(3000, () => {
    console.log('=> LISTENING ON PORT 3000'.green)
})


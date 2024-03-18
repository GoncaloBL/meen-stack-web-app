//IMPORTS
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const AppError = require('../utilities/AppError')

//UTILITIES
const { hashPassword, comparePassword } = require('../utilities/passwords')
const { isLoggedIn } = require('../utilities/middleware');

const app = express();
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true })) //parsing req.body for forms
app.use(express.json())
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
const User = require('../models/user')
const users = require ('../controllers/users')



//LOGIN USERS
router.get('/login', users.renderLogin )
router.post('/login',users.userLogin )

//REGISTER NEW USERS
router.get('/register', users.renderRegister )
router.post('/register', users.userRegister )

//LOGOUT
router.get('/logout', users.logout )

module.exports = router;
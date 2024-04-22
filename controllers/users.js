const User = require('../models/user')

//UTILITIES
const { hashPassword, comparePassword } = require('../utilities/passwords')


module.exports.renderLogin = (req, res) => {
    res.render('login', { title: 'Login' })
}
module.exports.userLogin = async (req, res, next) => {
    try {
        let credentials = req.body
        let user = await User.findOne({ username: credentials.username })
        if (!user) {
            req.flash('error', 'Username or password is incorrect')
            res.redirect('/login')
        } else {
            const result = await comparePassword(req.body.password, user.hashedPassword)
            if (result === true) {
                req.session.user = user
                console.log(`Logged user ${user.username} ID: ${user._id}`.green)
                req.flash('success', `Welcome back ${user.username}`)
                if (req.session.returnTo) { return res.redirect(`http://localhost:3000${req.session.returnTo}`) }
                delete req.session.returnTo; 
                res.redirect('/')
            } else {
                req.flash('error', 'Username or password is incorrect')
                res.redirect('/login')
            }
        }
    } catch (e) {
        next(e)
    }
}
module.exports.renderRegister = (req, res) => {
    res.render('register', { title: 'Register' })
}
module.exports.userRegister = async (req, res, next) => {
    try {
        //check if username already in database
        let credentials = req.body
        let user = await User.findOne({ username: credentials.username })
        if (user) {
            req.flash('error', 'Username already in database')
            res.redirect('/login')
        } else {
            let newUser = new User(req.body)
            newUser['hashedPassword'] = await hashPassword(req.body.hashedPassword)
            await newUser.save()
            req.session.user = newUser //if registered, login user
            req.flash('success', 'Created account with success, welcome')
            res.redirect('/')
        }
    }
    catch (e) {
        next(e);
    }
}

module.exports.logout = (req, res) => {
    req.flash('success', 'Logged out!')
    req.session.destroy();

    res.redirect('/')
}
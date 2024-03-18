const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must provide username']
    },
    email: {
        type: String
    },
    hashedPassword: {
        type: String,
        required: [true, 'Must provide password']


    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;
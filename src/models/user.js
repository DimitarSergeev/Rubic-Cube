const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = mongoose.model('User',authSchema)

module.exports = User
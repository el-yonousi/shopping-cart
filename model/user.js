const mongoose = require('mongoose')
    // const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        // index: true,
        // unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
})

// userSchema.plugin(uniqueValidator);

userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
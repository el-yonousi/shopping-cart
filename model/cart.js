const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    _idUser: {
        type: String,
        required: true
    },
    _idProduct: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Cart', cartSchema)
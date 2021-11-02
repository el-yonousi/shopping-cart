const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        required: true,
        type: {
            storage: {
                type: Number,
                required: true
            },
            sim: {
                type: String,
                required: true
            },
            resolution: {
                type: Number,
                required: true
            },
            display: {
                type: Number,
                required: true
            }
        }
    }
})

module.exports = mongoose.model('Product', productSchema)
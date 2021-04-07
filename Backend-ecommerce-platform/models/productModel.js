const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        trim: true
    },

    description: {
        type: String,
        require: true,
    
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        require: true
    },
    shipping: {
        type: Boolean,
        default: false,
        required: false
    },
    sold: {
        type: Number,
        default: 0
    },
    user_id: {
        type: ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema)
const mongoose = require('mongoose');


const adsSchema = new mongoose.Schema({
    photo: {
        data: Buffer,
        contentType: String
    },
})

module.exports = mongoose.model("Ads", adsSchema)
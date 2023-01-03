const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    price: Number,
    Description: String,
    location: String
});

module.exports = mongoose.model('Campground', campgroundSchema);
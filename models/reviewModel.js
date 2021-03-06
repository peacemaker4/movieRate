var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
    },
    movie_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
});
var review = new mongoose.model('Reviews', schema);
module.exports = review;
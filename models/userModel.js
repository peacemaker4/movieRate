var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});
var user = new mongoose.model('Users', schema);
module.exports = user;
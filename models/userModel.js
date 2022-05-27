var mongoose = require('mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
const passport=require('passport')

var userSchema = new mongoose.Schema({
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
userSchema.plugin(findOrCreate)

var userModel = new mongoose.model('Users', userSchema);

passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err,user)
    })
})

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/movierplus"
    },
    function(accessToken, refreshToken, profile, cb) {
        userModel.findOrCreate({ googleId: profile.id, username:profile.displayName, password: "google", email: "google" }, function (err, user) {
            return cb(err, user);
        });
    }
));

module.exports = userModel;
require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const passport=require('passport')
const session = require('express-session')
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
// const port = 3000;
const dbConfig = require('./config/database.config.js');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

var  userProfile;

//google OAuth 2
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//swagger
const swaggerUi = require("swagger-ui-express")
swaggerDocument = require("./swagger.json")
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    secret: ".env",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully Connected to Database!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use('/users', require('./routes/userRoute'))
app.use('/api/users', require('./routes/userApiRoute'))
app.use('/movies', require('./routes/movieRoute'))
app.use('/api/movies', require('./routes/movieApiRoute'))
app.use('/reviews', require('./routes/reviewRoute'))
app.use('/api/reviews', require('./routes/reviewApiRoute'))

app.use("/", require("./routes/root"));
app.use("/home", require("./routes/home"));
app.use("/about", require("./routes/about"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/admin/movies/add", require("./routes/add-movie"));

app.get("/auth/google",
    passport.authenticate('google',{ scope: ["profile"] })
)

app.get('/auth/google/movierplus',
    passport.authenticate('google', { failureRedirect: '/register' }),
    function(req, res) {
        res.redirect('/users/profile/me');
    });
//

app.get("/logout",function (req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
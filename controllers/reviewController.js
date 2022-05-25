const ReviewModel = require('../models/reviewModel')
const path = require("path");
const MovieModel = require("../models/movieModel");
//Create
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.description) {
        res.status(400).send({ message: "Entered data is empty!" });
    }

    const review = new ReviewModel({
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        movie_id: req.body.movie_id,
        date: Date.now()
    });

    await review.save().then(data => {
        // res.send({
        //     message:"Review published successfully!",
        //     user:data
        // });
        res.redirect("/movies/" + data.movie_id)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating user"
        });
    });
};
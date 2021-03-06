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
        res.send({
            message:"Review published successfully!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating user"
        });
    });
};
//FindAll
exports.findAll = async (req, res) => {
    try {
        const reviews = await ReviewModel.find();
        res.status(200).json(reviews);
    } catch(error) {
        console.log(error.message)
        res.status(404).json({message: error.message});
    }
};
//FindAllByMovieId
exports.findAllByMovieId = async (req, res) => {
    try {
        const reviews = await ReviewModel.find({ movie_id: req.params.movie_id});
        res.status(200).json(reviews);
    } catch(error) {
        console.log(error.message)
        res.status(404).json({message: error.message});
    }
};
//FindById
exports.findOne = async (req, res) => {
    try {
        const review = await ReviewModel.findById(req.params.id);
        res.send({
            message:"Review found successfully!",
            review: review
        })
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
//Delete
exports.destroy = async (req, res) => {
    await ReviewModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Review not found`
            });
        } else {
            res.send({
                message: "Review has been deleted!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
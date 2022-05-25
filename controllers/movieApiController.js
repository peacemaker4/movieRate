const MovieModel = require('../models/movieModel')
const path = require("path");
const UserModel = require("../models/userModel");
//Create
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.description) {
        res.status(400).send({ message: "Entered data is empty!" });
    }

    const movie = new MovieModel({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        genre: req.body.genre,
        country: req.body.country,
        director: req.body.director,
        actors: req.body.actors,
        cover: req.body.cover,
        trailer: req.body.trailer,
    });

    await movie.save().then(data => {
        res.send({
            message:"Movie added successfully!",
            movie:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while adding movie"
        });
    });
};
//FindAll
exports.findAll = async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.status(200).json(movies);
    } catch(error) {
        console.log(error.message)
        res.status(404).json({message: error.message});
    }
};
//FindById
exports.findOne = async (req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        res.send({
            message:"Movie found successfully!",
            movie: movie
        })
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
//FindByTitle
exports.findByTitle = async (req, res) => {
    try {
        if (req.body.searchReq) {
            const movie = await MovieModel.find({ title: new RegExp('^'+req.body.searchReq+'$', "i")});
            res.send({
                message:"Movie found successfully!",
                movie: movie
            });
        }
        else{
            res.status(404).send({
                message: `Movie not found`
            });
        }
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
//Update
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content is empty!"
        });
    }

    const id = req.params.id;

    await MovieModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Movie not found`
            });
        }else{
            res.send({ message: "Movie data updated successfully!" })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Delete
exports.destroy = async (req, res) => {
    await MovieModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Movie not found`
            });
        } else {
            res.send({
                message: "Movie has been deleted!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
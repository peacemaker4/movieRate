const UserModel = require('../models/userModel')
const path = require("path");
const {json} = require("express");
//Create
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.username && !req.body.password) {
        res.status(400).send({ message: "Entered data is empty!" });
    }

    const user = new UserModel({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        description: ""
    });

    await user.save().then(data => {
        res.send({
            message:"User created successfully!",
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
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch(error) {
        console.log(error.message)
        res.status(404).json({message: error.message});
    }
};
//FindById
exports.findOne = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.send({
        message:"User found successfully!",
        user: user
    })
};

//FindByUsername
exports.findByUsername = async (req, res) => {

    try {
        if (req.body.searchReq) {
            const users = await UserModel.find({ username: new RegExp('^'+req.body.searchReq+'$', "i")});
            res.send({
                message:"User found successfully!",
                user: users
            });
        }
        else{
            res.send({
                message:"User not found",
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

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found`
            });
        }else{
            res.send({ message: "User updated successfully!" })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Delete
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found`
            });
        } else {
            res.send({
                message: "User has been deleted!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
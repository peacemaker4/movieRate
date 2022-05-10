const express = require("express");
const router = express.Router();
const path = require('path');
const API_KEY = "k_kvc6nes2"

const axios = require('axios');

router
    .route("/")
    .get((req, res) =>{
        axios.all([
            axios.get('https://imdb-api.com/en/API/MostPopularMovies/'+API_KEY),
            axios.get('https://imdb-api.com/en/API/MostPopularTVs/'+API_KEY)
        ])

            .then(axios.spread((data1, data2) => {
                var data1 = data1.data.items;
                var data2 = data2.data.items;

                data1 = data1.slice(0, 5)
                data2 = data2.slice(0, 3)
                res.render(path.resolve("views/home.ejs"),{
                    data1: data1,
                    data2: data2
                })
            }));
        });
module.exports = router;
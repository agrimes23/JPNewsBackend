const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();

router.get('/news', async (req, res) => {

    console.log("Well hiii")
    try {
        console.log("Request to /news received");
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_API_KEY}`
        );
        const newsData = response.data;
        console.log("ooo json data: " + JSON.stringify(newsData))
        res.json(newsData);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'Unable to fetch news data'});
    }
});

module.exports = router;
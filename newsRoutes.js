const express = require("express");
const axios = require("axois");
const router = express.Router();

router.get('/news', async (req, res) => {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEW_API_KEY}`
        );
        const newsData = response.data;
        res.json(newsData);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch news data'});
    }
});

module.exports = router;
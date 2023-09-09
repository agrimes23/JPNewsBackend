const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();

router.get('/kanji', async (req, res) => {

    try {
        console.log("Request to /news received");
        const response = await axios.get(
            `https://jlpt-vocab-api.vercel.app/api/words`
        );
        const kanjiData = response.data;
        res.json(kanjiData);
    } catch (error) {
        console.error('Error fetching kanji data:', error);
        res.status(500).json({ error: 'Unable to fetch kanji data'});
    }
});

module.exports = router;
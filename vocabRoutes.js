const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();

router.get('/kanji/:level', async (req, res) => {

    try {
        console.log("Request to /kanji received");
        const { level } = req.params;
        const apiUrl =  `https://jlpt-vocab-api.vercel.app/api/words/all?level=${level}`;

        const response = await axios.get(apiUrl);
        const kanjiData = response.data;
        res.json(kanjiData);
    } catch (error) {
        console.error('Error fetching kanji data:', error);
        res.status(500).json({ error: 'Unable to fetch kanji data'});
    }
});

module.exports = router;
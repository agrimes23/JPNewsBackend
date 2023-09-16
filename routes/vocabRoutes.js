const express = require("express");
const axios = require("axios");
const newsInfo = require("./newsRoutes")
const router = express.Router();
require('dotenv').config();

router.get('/kanji/:level', async (req, res) => {

    try {
        console.log("Request to /kanji received, but have commented everything out :D");

        const n4data = JSON.parse(fs.readFileSync('./db/n4.json', 'utf8'));
        const newsData = await newsInfo.getNewsData();
        performSearch(newsData, n4data)


    // Implement your search logic here (e.g., using lodash or custom code)
    function performSearch(newsDescData, searchWords) {
        const searchResults = [];
    
        // Loop through each search word
        newsDescData.forEach((article) => {
            if(article.description) {
            searchWords.forEach((n4Word) => {
                const pattern = new RegExp(n4Word.word, "i");
        
                // Search for the word in the news description using the regular expression pattern
                const matchingWord = article.description.match(pattern);

                if(matchingWord != null) {
                    searchResults.push(matchingWord.toString());
                }
            });
    
            
        } else {
        }
        })
        console.log("matching words in array: " + JSON.stringify(searchResults))
        res.json(searchResults) 

    }
        
        // const { level } = req.params;
        // const apiUrl =  `https://jlpt-vocab-api.vercel.app/api/words?limit=30&level=${level}`;

        // const response = await axios.get(apiUrl);
        // const kanjiData = response.data;
        // res.json(kanjiData);
    } catch (error) {
        console.error('Error fetching kanji data:', error);
        res.status(500).json({ error: 'Unable to fetch kanji data'});
    }
});

module.exports = router;
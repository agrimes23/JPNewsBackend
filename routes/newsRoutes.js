const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();
const fs = require('fs');

router.get('/news', async (req, res) => {

    try {
        console.log("Request to /news received");
        
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_API_KEY}`
        );
    
        const n4data = JSON.parse(fs.readFileSync('./db/n4.json', 'utf8'));

        performSearch(response.data.articles, n4data)

////////////////////////////////////////////////////////////////////////////////
    // Implement your search logic here (e.g., using lodash or custom code)
    function performSearch(newsDescData, searchWords) {
        const searchResults = [];
        let parsedData = ""
    
        // Loop through each search word
        newsDescData.forEach((article) => {
            if(article.description) {
            searchWords.forEach((n4Word, index) => {
                const pattern = new RegExp(n4Word.word, "ig");
        
                // Search for the word in the news description using the regular expression pattern
                const matchingWord = article.description.match(pattern);
        
                if (matchingWord) {
                    // searchResults.push(matchingWord[0]); // Push the matched word to the results array
                    article.description = article.description.replace(matchingWord, `<span id=${index} className="text-red-500 font-bold">${matchingWord}</span>`)

                    // `<span id=${index} className="text-red-500 font-bold">${matchingWord}</span>`
            }
        
            });
    
            console.log("did it replace word with <span>?: " + JSON.stringify(article.description));
        } else {
            console.log("article desc is null, skipping")
        }
        })
    }
////////////////////////////////////////////////////////////////////////////////  

        res.json(newsData);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'Unable to fetch news data'});
    }
});

module.exports = router;
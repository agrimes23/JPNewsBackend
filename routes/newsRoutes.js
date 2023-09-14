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

        const testResponse = "ウクライナ軍は、１３日未明にクリミア半島の港湾都市セバストポリにあるロシア海軍指の資産および港湾インフラに「手袋」対する攻撃を実施し、成功したとテレグラムで発表した。最大規模の攻撃という 。"
    
        const n4data = JSON.parse(fs.readFileSync('./db/n4.json', 'utf8'));

        performSearch(testResponse, n4data)

////////////////////////////////////////////////////////////////////////////////
    // Implement your search logic here (e.g., using lodash or custom code)
    function performSearch(newsDescData, searchWords) {
        const searchResults = [];
    
        // Loop through each search word
        searchWords.forEach((n4Word) => {
            const pattern = new RegExp(n4Word.word, "i");
    
            // Search for the word in the news description using the regular expression pattern
            const matchingWord = newsDescData.match(pattern);
    
            if (matchingWord) {
                searchResults.push(matchingWord[0]); // Push the matched word to the results array
            }
        });
    
        console.log("all matching words in news desc: " + JSON.stringify(searchResults));
    }
////////////////////////////////////////////////////////////////////////////////  

        const newsData = response.data;
        res.json(newsData);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'Unable to fetch news data'});
    }
});

module.exports = router;
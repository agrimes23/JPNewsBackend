const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require("axios");

// Post-MPV:
  // when word is clicked: have another route that gets the word's definition, makes an api call to get it
  

router.get('/search/:level', async (req, res) => {

  let level = req.params.level
  try {
    console.log("Request to /search received, but have commented everything out :D");

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_API_KEY}`
  );

    const jlptLeveldata = JSON.parse(fs.readFileSync(`./db/${level}.json`, 'utf8'));

    // console.log("response.data: " + JSON.stringify(response.data))
    performSearch(response.data.articles, jlptLeveldata)


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

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

});



module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require("axios");

// Making this so it gets the news descriptions on the backend
// it will:
  // loop through each word of the description, 
  // if there's a word that is the same as a word in n4.json, replace that word with <span id={} className="text-red-500 bold"></span>
// send the array to the frontend, where it then can display on screen

// Post-MPV:
  // when word is clicked: have another route that gets the word's definition, makes an api call to get it
  

router.get('/search', async (req, res) => {

  try {
    console.log("Request to /search received, but have commented everything out :D");

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_API_KEY}`
  );
    // Read the large N4 JSON file
    const n4data = JSON.parse(fs.readFileSync('./db/n4.json', 'utf8'));
    // Perform the search logic here

    console.log("response.data: " + JSON.stringify(response.data))
    performSearch(response.data.articles, n4data)


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
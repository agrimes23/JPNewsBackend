const express = require('express');
const router = express.Router();
const fs = require('fs');
const newsRoutes = require('./newsRoutes');


// Making this so it gets the news descriptions on the backend
// it will:
  // loop through each word of the description, 
  // if there's a word that is the same as a word in n4.json, replace that word with <span id={} className="text-red-500 bold"></span>
// send the array to the frontend, where it then can display on screen

// Post-MPV:
  // when word is clicked: have another route that gets the word's definition, makes an api call to get it
  

router.get('/search', async (req, res) => {

  try {
    // Read the large N4 JSON file
    const n4data = JSON.parse(fs.readFileSync('./db/n4.json', 'utf8'));
    console.log(JSON.stringify(newsRoutes.res) + ":::::::::: news route! :O")
    // Perform the search logic here
    const searchResults = performSearch(n4data, searchWords);

    // Send the search results as a JSON response
    res.json(searchResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Implement your search logic here (e.g., using lodash or custom code)
function performSearch(data, searchWords) {
  const searchResults = [];

  // Loop through each search word
  searchWords.forEach((searchWord) => {
    const pattern = new RegExp(searchWord, 'i');

    // Filter the data based on the RegExp pattern
    const matchingItems = data.filter((item) => {
      // Replace the specific property name ('word' in this case) with the property you want to search in
      return pattern.test(item.word);
    });

    // Add the matching items to the search results
    searchResults.push(...matchingItems);
  });

  return searchResults;


}

module.exports = router;
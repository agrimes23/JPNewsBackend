const getKanjiByLevel = async (level) => {
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
      return searchResults;
    
    }
}

const getTopNews = async () => {

    try {
        console.log("Request to /news received");
            
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_API_KEY}`
        );
        
        const newsData = response.data
        return newsData
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'Unable to fetch news data'});
    }
}

module.exports = {
    getKanjiByLevel,
    getTopNews
}
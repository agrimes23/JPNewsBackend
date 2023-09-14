const express = require('express');
const router = express.Router();
const fs = require('fs');

// Define a route to send n4.json data to the frontend
router.get('/n4data', (req, res) => {
  try {
    // Read the n4.json file
    const n4data = JSON.parse(fs.readFileSync('./db/n4.json', 'utf8'));

    // Send the data as a JSON response
    res.json(n4data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
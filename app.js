const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors")

const newsRoutes = require('./routes/newsRoutes');
const kanjiRoutes = require('./routes/vocabRoutes')
const jsonTestRoutes = require('./routes/kanjiRoutes')

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, Express!')
})

app.use('/api', newsRoutes)
app.use('/api', kanjiRoutes)
app.use('/api', jsonTestRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
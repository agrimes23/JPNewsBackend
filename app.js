const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors")


const newsRoutes = require('./newsRoutes');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hellow, Express!')
})

app.use('/api', newsRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
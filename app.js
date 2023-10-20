const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors")

const newsRoutes = require('./routes/newsRoutes');
const jsonTestRoutes = require('./routes/kanjiRoutes.js')
const userRoutes = require('./routes/userRoutes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  }));

app.get('/', (req, res) => {
    res.send('Hello, Express!')
})

app.use('/api', newsRoutes)
// app.use('/api', kanjiRoutes)
app.use('/api', jsonTestRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
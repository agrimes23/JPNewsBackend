const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require("cors")
require('./config/database');
const newsRoutes = require('./routes/newsRoutes');
const jsonTestRoutes = require('./routes/kanjiRoutes.js')
const userRoutes = require('./routes/userRoutes')
const { ApolloServer, gql } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./graphql')

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
app.use('/api', jsonTestRoutes)
app.use('/api/users', userRoutes)

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: '/graphql'})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
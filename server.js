const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require("cors")
require('./config/database');
const newsRoutes = require('./routes/newsRoutes');
const jsonTestRoutes = require('./routes/kanjiRoutes.js')
const userRoutes = require('./routes/userRoutes')
const typeDefs = require('./graphql/graphqlSchema.js')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const resolvers = require("./graphql/resolvers.js")

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET, POST, PUT, DELETE',
//     credentials: true,
//   }));

// app.get('/', (req, res) => {
//     res.send('Hello, Express!')
// })

// const server = new ApolloServer({ 
//     typeDefs
// })

const server = new ApolloServer({ 
    typeDefs, // definition of types of data
    resolvers
})

// app.use('/api', newsRoutes)
// app.use('/api', jsonTestRoutes)
// app.use('/api/users', userRoutes)

// app.listen(port, () => {
//     console.log(`Server is running at ${url}`)
// })

async function start() {
    const { url } = await startStandaloneServer(server, {
        listen: {port: 4000}
    })
    console.log(`Server is running at ${url}`)
}

start();
# JLPT News Study Backend
This is the backend for the JLPT News Study App. Users can read Japanese news and save JLPT-related kanji characters based on the official JLPT level. In the future, users will be able to save kanji characters from news articles they don't know to a flashcard set to study for their JLPT!

The backend of the project filters through and organizes the kanji needed to be highlighted for the frontend.I started this project using REST API, but then migrated it to GraphQL.
This app also uses JWT authentication and bcrypt to securely store passwords. Middleware is applied to GraphQL resolvers. 

Next step after authentication and creating a user profile is to create another database to save flashcard sets. 

## Technologies used
- Express
- Node
- GraphQL
- MongoDB
- Mongoose

See the frontend code: https://github.com/agrimes23/ReactJLPTNews

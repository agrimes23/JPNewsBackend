# JLPT News Study Backend
The backend of the project filters through and organizes the kanji needed to be highlighted for the frontend.I started this project using REST API, but then migrated it to GraphQL.
This app also uses JWT authentication and bcrypt to securely store passwords. Middleware is applied to GraphQL resolvers. 

Next step after authentication and creating a user profile is to create another database to save flashcard sets. 

## Technologies used
- Express
- Node
- GraphQL
- MongoDB
- Mongoose

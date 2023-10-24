// const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
// const User = require('./models/userModel'); // Import your Mongoose model

// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     _id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     email: { type: GraphQLString },
//     createdAt: { type: GraphQLString },
//     updatedAt: { type: GraphQLString },
//   }),
// });

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     getUser: {
//       type: UserType,
//       args: { _id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return User.findById(args._id);
//       },
//     },
//     getAllUsers: {
//       type: new GraphQLList(UserType),
//       resolve() {
//         return User.find({});
//       },
//     },
//   },
// });

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     createUser: {
//       type: UserType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         email: { type: new GraphQLNonNull(GraphQLString) },
//         password: { type: new GraphQLNonNull(GraphQLString) },
//       },
//       resolve(parent, args) {
//         const user = new User({
//           name: args.name,
//           email: args.email,
//           password: args.password,
//         });
//         return user.save();
//       },
//     },
//     // Add update and delete mutations here
//   },
// });

// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation,
// });

const typeDefs = `#graphql
  type User {
    id: ID,
    name: String!,
    email: String!,
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }
`;

module.exports = typeDefs

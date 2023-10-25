const { getAllUsers, getUser } = require('../controllers/userController');
const User = require("../models/userModel")

// Define resolvers
const resolvers = {
  Query: {
    getUsers: async (_, args, context) => {
      const users = await getAllUsers();
      return users;
    },
    // args is the query variable
    getUserById: async (_, args, context) => {
      const user = await getUser(args.id);
      return user
    },
    // getKanji: async (_, args, context) {
    //   const user = await
    // }
  },
};

module.exports = resolvers;
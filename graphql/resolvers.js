const { getAllUsers, getUser, registerUser, login } = require('../controllers/userController');
const { getKanjiByLevel, getTopNews } = require("../controllers/kanjiNewsController")
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
    getKanji: async (_, args, context) => {
      const kanjiList = await getKanjiByLevel(args.level)
      return kanjiList;
    },
    getArticles: async (_, args, context) => {
      try {
        const newsData = await getTopNews();
        return newsData;
      } catch (error) {
        console.error("Error in fetching data from third-party API: ", error)
      }
      
    },
  },
  Mutation: {
    deleteUser: async (_, args, context) => {
      console.log("oo deleted forever :( ")
      return
    },
    registerUser: async (parent, { input }, context) => {
      if (context.user) {
        throw new Error('You are already logged in')
      }
      return registerUser(input)
    },
    loginUser: async (parent, { input }, context) => {
      if (context.user) {
        throw new Error('You are already logged in')
      }
      return login(input);
    }
  }
};

module.exports = resolvers;
const { getAllUsers, getUser } = require('../controllers/userController');
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
      console.log("check check")
      return kanjiList;
    },
    // getNews: async (_, args, context) => {
    //   const newsData = await getTopNews();
    // },
  },
};

module.exports = resolvers;
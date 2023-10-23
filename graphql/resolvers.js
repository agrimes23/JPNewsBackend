

const users = [
    {
      name: 'User1',
      email: 'user1@example.com',
      password: 'password1',
    },
    {
      name: 'User2',
      email: 'user2@example.com',
      password: 'password2',
    },
  ];
  
  // Define resolvers
  const resolvers = {
    Query: {
      userAuth: () => {
        return users;
      },
    },
  };
  
  module.exports = resolvers;
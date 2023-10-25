const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const protect = async (args) => {
    const { req } = args;
    console.log("args: " + JSON.stringify(args))
    let token;
  

      try {
        // Get token from header

        
        // token = req.headers.authorization.split(' ')[1];
  
        // Verify token
        const decoded = jwt.verify(args.id, process.env.JWT_TOKEN_SECRET);
        const userId = decoded.id
        // Get user from the token and store it as context.authenticatedUser
        const authenticatedYay = await User.findById(userId).select('-password');
        console.log("woo: " + authenticatedYay)
        return authenticatedYay._id
      } catch (error) {
        console.log("Error, not authorized: ", error);
        throw new Error("Not authorized");
      }
    
  
    if (!args.id) {
      // You may choose to allow unauthenticated requests, or you can throw an error here
      // if you want to enforce authentication for all requests.
      throw new Error('Not authorized, no token');
      
    }
  };
  
  module.exports = { protect };
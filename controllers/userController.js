const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = async (input) => {

    const { name, email, password } = input
    console.log("name, email, pw: ", name + " " + email + " " + password)
    if(!name || !email || !password) {
        throw new Error("Please provide all required fields");
    }

    // check if user exists
    const userExisits = await User.findOne({email})

    if (userExisits) {
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        const token = generateToken(user._id);
        return { user, token };
    } else {
        throw new Error("Invalid user data");
    }

}

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const login = async (input) => {

    const { email, password } = input

    // Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);
        return { user, token };
    } else {
        throw new Error("Invalid credentials");
    }

    
}

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getUser = async (id) => {
    const user = await User.findById(id)

    if (!user) {
        return null;
    }

    return user;
}

// for dev testing only
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
  };


// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    login,
    getUser,
    getAllUsers
}
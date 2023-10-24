const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {

    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).send("Please add all fields")
        return;
    }

    // check if user exists
    const userExisits = await User.findOne({email})

    if (userExisits) {
        res.status(400).send("User already exists")
        return;
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
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).send("Invalid user data")
        return;
    }

}

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {

    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).send("Invalid credentials")
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
    loginUser,
    getUser,
    getAllUsers
}
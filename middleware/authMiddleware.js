const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

            // get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log("Error, not authorized: ", error)
            res.status(401).send("Error, Not authorized")
            return;
        }
    }

    if(!token) {
        res.status(401).send('Not authorized, no token')
        return;
    }
}

module.exports = { protect }
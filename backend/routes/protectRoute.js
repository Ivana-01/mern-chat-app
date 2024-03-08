const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async (req, res, next) => {
    try{
        const token = req.headers.token;
        console.log(token)
        if(!token){
           return res.status(401).json({msg: 'No token, authorization denied'});
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({msg: 'Token verification failed, authorization denied'});
        }
        console.log(verified)
        const user = await User.findById(verified.id).select('-password');
        if(!user){
            return res.status(404).json({msg: 'User not found, authorization denied'});
        }
        console.log(user)
        req.user = user;
        next();
    }
    catch(err){
        res.status(500).json({err: 'Server error: ' + err})
    }
}

module.exports = protectRoute
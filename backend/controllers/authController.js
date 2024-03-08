const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER A NEW USER
const register = async (req, res) => {

    //get inputs from frontend
    try{
        const { 
            fullName,
            gender,
            username, 
            password,
            confirmPassword 
        } = req.body;

        //check if all fields are filled
        if (!fullName || !gender || !username || !password || !confirmPassword) {
            return res.status(400).json({msg: "Please fill in all fields"});
        }

        //check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({msg: "Passwords do not match"});
        }

        //check for existing username
        const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({msg: "This username is already taken"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //choosing a profile image
        const maleProfileImg = 'https://avatar.iran.liara.run/public/boy'
        const femaleProfileImg = 'https://avatar.iran.liara.run/public/girl'

        //create new user and save to database
        const newUser = new User({
            profileImg: gender === 'female' ? femaleProfileImg : maleProfileImg,
            fullName,
            gender,
            username,
            password: passwordHash
        })

        //save user and generate token
        await newUser.save()
        .then(await tokenAndCookies(newUser._id, res))
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(500).json({err: 'server error: ' + err})
    }
}

//LOGIN A USER
const login = async (req, res) => {
    try{
        const { username, password } = req.body;

        //check if all fields are filled
        if (!username || !password) {
            return res.status(400).json({msg: "Please fill in all fields"});
        }
        //find the user by username from db
        const user = await User.findOne({username});
        const passwordMatch = await bcrypt.compare(password, user?.password || ''); //check if password is correct if the user exists, if not compare to empty string
        //if no user is found or password doesn't match send
        if (!user || !passwordMatch) {
            return res.status(400).json({msg: "Invalid username or password!"});
        }
        console.log(user._id)
        //generate tokens for auth and http
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: '15d'});
        res.cookie('jwt', token, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 15 * 24 * 60 * 60 * 1000});
        console.log(token)
        res.status(200).json({user, token: token});
    }
    catch(err){
        res.status(500).json({err: 'server error: ' + err})
    }
}

//LOGOUT A USER
const logout = async (req, res) => {
    try{
        res.clearCookie('jwt');
        res.status(200).json({msg: 'Logged out!'});
    }
    catch(err){
        res.status(500).json({err: 'server error: ' + err})
    }
}

module.exports = {
    register,
    login,
    logout
}
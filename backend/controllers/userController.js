const User = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ err: 'Server error: ' + err });
    }
}

module.exports = {
    getUsers
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    profileImg: {
        type: String,
    },
    fullName: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    username: {
        type: String, 
        unique: true,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, //Create and update time
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const convoSchema = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]
}, //Create and update time
{
    timestamps: true
})

module.exports = mongoose.model('Convo', convoSchema)
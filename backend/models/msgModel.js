const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, //Create and update time
{
    timestamps: true
})

module.exports = mongoose.model('Message', msgSchema)
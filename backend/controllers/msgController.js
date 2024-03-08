const Convo = require('../models/convoModel')
const Message = require('../models/msgModel')


//SENDING MESSAGE
const sendMessage = async (req, res) => {
    try{ //get inputs
        const { message } = req.body;
        const receiverID = req.params.id;
        const senderID = req.user._id;
console.log(receiverID, senderID)
        //update existing conversation
        let conversation = await Convo.findOne(
            { members: {$all: [senderID, receiverID]}},
        );

        //create new conversation
        if(!conversation){
            conversation = await Convo.create({
                members: [senderID, receiverID]
            })
        }

        //create new message
        const newMessage = new Message({
            senderID,
            receiverID,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(), newMessage.save()])
        res.status(200).json(newMessage)
    }
    catch(err){
        res.status(500).json({err: 'server error: ' + err})
    }
}


//GET MESSAGES
const getMessages = async (req, res) => {
    try{
        const senderID = req.user._id
        const receiverID = req.params.id
        const conversation = await Convo.findOne({
            members: {$all: [senderID, receiverID]}
        }).populate('messages');
        if (!conversation){
            return res.status(200).json([])
        }
        res.status(200).json(conversation.messages)
    }
    catch(err){
        res.status(500).json({err: 'server error: ' + err})
    }
}


module.exports = {
    sendMessage,
    getMessages
}
const express = require('express')
const msgController = require('../controllers/msgController')
const protectRoute = require('../routes/protectRoute')

const router = express.Router()

//get all messages between user and receiver
router.get('/:id', protectRoute, msgController.getMessages)
//send a message to the receiver
router.post('/send/:id', protectRoute, msgController.sendMessage)


module.exports = router
const express = require('express')
const userController = require('../controllers/userController')
const protectRoute = require('../routes/protectRoute')

const router = express.Router()

//get all users for sidebar
router.get('/', protectRoute, userController.getUsers)


module.exports = router
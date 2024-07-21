const express = require('express')
const router = express.Router()

const { createMessage, getAllMessages, deleteAllMessages } = require('../controllers/messages')
router.route('/').get(getAllMessages).post(createMessage).delete(deleteAllMessages)

module.exports = router
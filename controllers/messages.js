const Message = require('../models/Message')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllMessages = async(req, res) => {
    const messages = await Message.find()
    res.status(StatusCodes.OK).json({messages})
}

const createMessage = async(req, res) => {
    const newMessage = Message.create({...req.body})
    res.status(StatusCodes.CREATED).json({Message: newMessage, msg: "created Message successfully"})
}

const deleteAllMessages = async(req, res) => {
    Message.deleteMany({})
    res.status(StatusCodes.OK).json({ msg: "deleted all successfully "})
}

module.exports = { createMessage, getAllMessages, deleteAllMessages }
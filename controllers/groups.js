const Group = require('../models/Group')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllGroups = async(req, res) => {

    const groups = await Group.find()
    res.status(StatusCodes.OK).json({groups, count: groups.length})
}

module.exports = { getAllGroups }
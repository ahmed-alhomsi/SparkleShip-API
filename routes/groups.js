const express = require('express')
const router = express.Router()

const { getAllGroups } = require('../controllers/groups')
router.route('/').get(getAllGroups)

module.exports = router
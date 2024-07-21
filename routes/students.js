const express = require('express')
const router = express.Router()
const { updateStudent, getAllStudents, getStudent } = require('../controllers/students')

router.route('/').get(getAllStudents)
router.route('/:id').get(getStudent).patch(updateStudent)

module.exports = router
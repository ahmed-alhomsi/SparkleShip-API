const Student = require('../models/Student')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllStudents = async(req, res) => {

    const students = await Student.find()

    res.status(StatusCodes.OK).json({ students })
}

const getStudent = async(req, res) => {
    const studentID = req.params.id
    if(!studentID) {
        throw new BadRequestError('studentID ID must be provided')
    }
    const student = await Student.find({_id: studentID})

    res.status(StatusCodes.OK).json({ student })
}


const updateStudent = async(req, res) => {
    const studentID = req.params.id
    
    if(!studentID) {
        throw new BadRequestError('student ID must be provided')
    }

    const updatedStudent = await Student.updateOne({_id: studentID}, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({ student: updatedStudent, msg: "updated student" })
}


module.exports =  { updateStudent, getAllStudents, getStudent }
const Student = require('../models/Student')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const {UnauthenticatedError} = require('../errors')

const jwt = require('jsonwebtoken')

const register = async(req, res) => {
    const student = await Student.create({...req.body})
    
    const token = student.createJWT()

    res.status(StatusCodes.CREATED).json({name: student.name, id: student._id , token})
}

const login = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('please provide a username and a password')
    }
    const student = await Student.findOne({email})
    if(!student) {
        throw new UnauthenticatedError("Invalid Credintials")
    }
    const password_is_correct = await student.checkPassword(password)
    if(!password_is_correct) {
        throw new UnauthenticatedError("Invalid Password")
    }
    const token = student.createJWT()
    res.status(StatusCodes.OK).json({name: student.name, id: student._id, token, gender: student.gender, phoneNumber: student.phoneNumber, degree: student.lastDegreeAcquired, fieldOfStudy: student.fieldOfStudy, levelOfEnglish: student.languageLevelLetter, hoursOfWorkExperience: student.hoursOfWorkExperience, hoursOfVolunteeringExperience: student.hoursOfVolunteeringExperience, gpa: student.gpa, age: student.age, currentResidency: student.currentResidency, nationality: student.nationality})
}

module.exports = { register, login }
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a name"],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "please enter an email"],
        minlength: 3,
        maxlength: 50,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please enter a valid email!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: 6,
        maxlength: 100
    },
    gpa: {
        type: String,
    },
    age: {
        type: Number,
        min: 18,
        max: 35
    },
    phoneNumber: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    nationality: {
        type: String
    },
    fieldOfStudy: {
        type: String,
    },
    hoursOfWorkExperience: {
        type: Number,
        min: 0,
        max: 12000,
        default: 0
    },
    hoursOfVolunteeringExperience: {
        type: Number,
        min: 0,
        max: 6000,
        default: 0
    },
    languageLevelLetter: {
        type: String,
        enum: ["A1", "A2", "B1", "B2", "C1", "C2"]
    },
    currentResidency: {
        type: String,
    },
    lastDegreeAcquired: {
        type: String,
        enum: ["highschool", "bachelors", "masters", "phd"]
    }
})

StudentSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

StudentSchema.methods.createJWT = function() {
    return jwt.sign({userID: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

StudentSchema.methods.checkPassword = async function(candidatePassword) {
    const matches = await bcrypt.compare(candidatePassword, this.password)
    return matches
}

module.exports = mongoose.model('Student', StudentSchema)

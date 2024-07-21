const mongoose = require('mongoose')

const ScholarshipSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, "please enter scholarship title"],
        // minlength: 3,
        // maxlength: 50
    },
    description: {
        type: String,
        // required: [true, "please enter scholarship description"],
        // minlength: 15,
        // maxlength: 500
    },
    country: {
        type: String,
        // required: [true, "please provide the country this scholarship is located in"],
    },
    providedBy: {
        type: String,
        // required: [true, "please provide the party providing the scholarship"],
    },
    link: {
        type: String,
    },
    availableSeats: {
        type: Number,
        // min: 1,
        // max: 10000
    },
    applyDate: {
        // type: Date,
        type: String,
        // required: [true, "please enter scholarship start date"]
    },
    deadline: {
        // type: Date,
        type: String,
        // required: [true, "please enter scholarship deadline"]
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    minimumGPA: {
        // type: Number,
        // min: 2.0,
        // max: 4.0
        type: String
    },
    location: {
        type: String
    },
    fieldOfStudy: {
        type: String,
    },
    hoursOfWorkExperience: {
        type: Number,
        min: 0,
        max: 10000,
        default: 0
    },
    hoursOfVolunteeringExperience: {
        type: Number,
        min: 0,
        max: 5000,
        default: 0
    },
    languageTest: {
        type: String,
        // enum: ["TOEFL", "IELTS", "EITHER"],
        default: "IELTS"
    },
    languageLevelLetter: {
        type: String,
        enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
        default: "A2"
    },
    funding: {
        type: String,
        // enum: ["fully-funded", "partially-funded"],
        default: "fully-funded"
    },
    requiredDegree: {
        type: String,
        // enum: ["highschool", "bachelors", "masters", "phd"],
        default: "bachelors"
    },
    // nationalities: [{type: String}]
})

module.exports = mongoose.model('Scholarship', ScholarshipSchema)
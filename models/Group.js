const mongoose = require('mongoose')

const Group = new mongoose.Schema({
   name: {
    type: String
   },
   memberCount: {
    type: String
   },
   fieldOfStudy: {
    type: String
   },
   Description: {
    type: String
   }
})

module.exports = mongoose.model('Group', Group)
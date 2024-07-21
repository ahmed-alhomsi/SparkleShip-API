const mongoose = require('mongoose')

const Message = new mongoose.Schema({
   sender: {
    type: String
   },
   name: {
    type: String
   },
   message: {
    type: String
   },
   time: {
    type: String
   }
})

module.exports = mongoose.model('Message', Message)
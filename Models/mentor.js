const mongoose = require('mongoose')

const MentorSchema = new mongoose.Schema({
    MentorId: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true 
    },
    Profession: String,
    Email: {
        type: String,
        required: true 
    },
    Phone: {
        type: String,
        required: true 
    },
})

module.exports = mongoose.model('Mentor',MentorSchema)
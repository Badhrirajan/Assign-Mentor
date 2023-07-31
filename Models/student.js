const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    StudentId: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true 
    },
    Email: {
        type: String,
        required: true 
    },
    Phone: {
        type: String,
        required: true 
    },
    Mentor: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
    PreviousMentor: {
        type: mongoose.Schema.ObjectId,
        default: null
    }
})

module.exports = mongoose.model('Student',StudentSchema)
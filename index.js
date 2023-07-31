const express = require('express')
const app = express();
const StudentRouter = require('./Controllers/studentcontroller')
const MentorRouter = require('./Controllers/mentorcontroller')
const mongoose = require('mongoose')
const URL = "mongodb+srv://Badhrirajan:Badhri2211@cluster0.gxfd2vs.mongodb.net/Student-Mentor"

const port = 4000

async function Connect(){
    try{
        mongoose.connect(URL)
        await console.log("Database connection is success")
    }
    catch(err){
        console.log('Error in connecting database')
    }
}

Connect();

app.listen(port, '0.0.0.0', () => {
    console.log("SERVER STARTED IN THE PORT", port)
})

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Welcome to Student Database!!"
    })
})

app.use(express.json())
app.use('/', StudentRouter)
app.use('/', MentorRouter)
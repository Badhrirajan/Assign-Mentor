const StudentRouter = require('express').Router();
const Student = require('../Models/student')

//FETCHING STUDENTS DATA
StudentRouter.get('/student', async(req,res) => {
    try{
        const student = await Student.find()
        res.status(200).json({
            message: "Students Data",
            data: student
        })
    } catch(err){
        res.send('Error Occured',err)
    }
})

//CREATING STUDENTS DATA
StudentRouter.post('/student', async (req,res) => {
    const student = new Student({
        StudentId: req.body.StudentId,
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
    })
    try{
        const result = await student.save()
        res.json({
            message: "Student Data Entered Successfully!!",
            data: result
        })
    } catch(err){
        res.send("Error Occured",err)
    }
})

//UPDATING STUDENTS USING STUDENTID AND MENTORID
StudentRouter.put('/student/:StudentId/mentor/:MentorId', async(req,res) => {
    try{
        const studentId = req.params.StudentId;
        const mentorId = req.params.MentorId;

        const student = await Student.findByIdAndUpdate(
            studentId,
            {Mentor: mentorId},
            {new: true}
        );
        res.status(200).send(student)
    }catch(err){
        console.log("Error in updating data")
    }
})

//FETCHING STUDENTS WITHOUT MENTOR
StudentRouter.get('/student/unassigned-mentor', async(req,res) => {
    try{
        const student = await Student.find({Mentor: null})
        res.status(200).send({
            message: "Unassigned Students",
            data: student
        })
    } catch(err){
        console.log("Error in finding data", err)
    }
})

//FETCHING STUDENTS WITH MENTOR
StudentRouter.get('/assigned/students', async(req,res) => {
    try{
        const mentor = await Student.aggregate([{
            $match: {Mentor: {$ne: null}}},
            {$lookup: {from: "mentors", localField:'Mentor',foreignField:'_id',as:'AssignedMentor'}}])
        
        res.status(200).send({
            message: "Students With Mentors",
            data: mentor
        })
    } catch(err){
        console.log("Error in fethcing data", err)
    }
})

//UPDATING STUDENT WITH PREVIOUSMENTOR USING STUDENTID AND MENTORID
StudentRouter.get('/student/:studentId/previousmentor/:mentorId', async(req,res) => {
    try{
        const studentId = req.params.studentId;
        const mentorId = req.params.mentorId;

        const student = await Student.findByIdAndUpdate(
            studentId,
            {PreviousMentor: mentorId},
            {new: true}
        );
        res.status(200).send(student)
    }catch(err){
        console.log("Error in updating data")
    }
})

//FETCHING STUDENT WITH PREVIOUS MENTOR DATA
StudentRouter.get('/previousmentor', async(req,res) => {
    try{
        const mentor = await Student.aggregate([{
            $match: {PreviousMentor: {$ne: null}}},
            {$lookup: {from: "mentors", localField:'PreviousMentor',foreignField:'_id',as:'PreviousMentor'}}])
        
        res.status(200).send({
            message: "Previous Mentor Data",
            data: mentor
        })
    } catch(err){
        console.log("Error in fethcing data", err)
    }
})

module.exports = StudentRouter;
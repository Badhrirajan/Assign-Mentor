const MentorRouter = require('express').Router()
const Mentor = require('../Models/mentor')

//FETCHING MENTORS DATA
MentorRouter.get('/mentor', async(req,res) => {
    try{
        const mentor = await Mentor.find()
        res.status(200).json({
            message: "Mentors Data!!",
            data: mentor
        })
    } catch(err){
        res.send('Error Occured',err)
    }
})

//CREATING MENTORS DATA
MentorRouter.post('/mentor', async (req,res) => {
    const mentor = new Mentor({
        MentorId: req.body.MentorId,
        Name: req.body.Name,
        Profession: req.body.Profession,
        Email: req.body.Email,
        Phone: req.body.Phone,
    })
    try{
        const result = await mentor.save()
        res.json({
            message: "Mentor Data Entered Successfully!!",
            data: result
        })
    } catch(err){
        res.send("Error Occured",err)
    }
})

module.exports = MentorRouter;
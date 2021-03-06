const router = require('express').Router()
const Question = require('../db/models/question')
module.exports = router

router.get('/', async(req,res,next) => {
    if (!req.user) res.sendStatus(401)
    try {
        const questions = await Question.findAll()
        res.json(questions)
    } catch(err){
        next(err)
    }
})

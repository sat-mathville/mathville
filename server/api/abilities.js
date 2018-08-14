const router = require('express').Router()
const {Ability,User} = require('../db/models')
module.exports = router


// router.get('/', async(req,res,next)=>{
//   try{
//     const abilities = await Ability.findAll({
//       where: {
//        userId:req.user.id
//       },
//       include:
//     })
//     res.json(abilities)
//   }
//   catch(error){
//     next(error)
//   }
// })

// router.put('/:userId',async(req,res,next) => {

// })

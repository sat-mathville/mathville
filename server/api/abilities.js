const router = require('express').Router()
const Ability = require('../db/models/ability')
module.exports = router


router.get('/', async(req,res,next)=>{
  try{
    const abilities = await Ability.findAll({where:{
      userId: req.user.id
    }
    })
    res.json(abilities)
  }
  catch(error){
    next(error)
  }
})

router.put('/:userId',async(req,res,next) => {

})

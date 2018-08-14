const router = require('express').Router()
const {Ability, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const abilities = await User.findAll({
      where: {
        id: req.user.id
      },
      include: [{
        model: Ability,
        required: true
      }]
    })
    res.json(abilities)
  } catch (error) {
    next(error)
  }
})

// router.put('/:userId',async(req,res,next) => {

// })

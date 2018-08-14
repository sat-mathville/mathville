const router = require('express').Router()
const {User, Ability} = require('../db/models')
module.exports = router

router.put('/:id', async (req,res,next) => {
  try {
    const [user, ability] = await Promise.all([
      User.findById(req.user.id),
      Ability.findById(+req.params.id)
    ])
    await ability.setUsers(user)
    const abilitiesIds = await user.getAbilities()
    res.status(201).send(abilitiesIds)
  } catch(err){
    next(err)
  }
})

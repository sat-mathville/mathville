const router = require('express').Router()
const {User, Ability} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const abilities = await Ability.findAll()
    res.json(abilities)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const [user, ability] = await Promise.all([
      User.findById(req.user.id),
      Ability.findById(+req.params.id)
    ])
    await ability.setUsers(user)
    res.status(201).send(ability.id)
  } catch(err){
    next(err)
  }
})

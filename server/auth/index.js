const router = require('express').Router()
const {User, Ability} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const abilities = await user.getAbilities()
      const data = {
        user,
        abilities: abilities.map(ability => ability.id)
      }
      req.login(user, err => (err ? next(err) : res.json(data)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {username, email, password, character} = req.body
    const user = await User.create({username, email, password, character})
    const abilities = []
      const data = {
        user,
        abilities
      }
    req.login(user, err => (err ? next(err) : res.json(data)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.json({user:{},abilities:[]})
})

router.get('/me', async (req, res) => {
  if(req.user){
    try{
      const user = await User.findById(req.user.id)
      const abilities = await user.getAbilities()
      const data = {
        user: req.user,
        abilities: abilities.map(ability => ability.id)
      }
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
  else{
    res.json({user:{},abilities:[]})
  }
})

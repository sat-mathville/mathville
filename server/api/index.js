const router = require('express').Router()
module.exports = router

router.use('/questions', require('./questions'))
router.use('/abilities', require('./abilities'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

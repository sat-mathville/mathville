const Ability = require('./ability')
const Question = require('./question')
const User = require('./user')

User.belongsToMany(Ability, {through: 'user-abilities'})
Ability.belongsToMany(User, {through: 'user-abilities'})

Ability.hasMany(Question)
Question.belongsTo(Ability)

module.exports = {
  Ability,
  Question,
  User
}

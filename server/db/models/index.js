
const Ability = require('./ability')
const Question = require('./question')
const User = require('./user')
const Category = require('./category')

User.belongsToMany(Ability, {through: 'user-abilities'})
Ability.belongsToMany(User, {through: 'user-abilities'})

Ability.belongsTo(Category)
Category.hasOne(Ability)

Category.hasMany(Question)
Question.belongsTo(Category)

module.exports = {
  Ability,
  Category,
  Question,
  User
}

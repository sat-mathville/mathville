
const Ability = require('./ability')
const Character = require('./character')
const Question = require('./question')
const User = require('./user')
const Category = require('./category')

User.belongsTo(Character)
Character.hasMany(User)

User.belongsToMany(Ability, {through: 'user-abilities'})
Ability.belongsToMany(User, {through: 'user-abilities'})

Ability.belongsTo(Category)
Category.hasMany(Ability)

Category.hasMany(Question)
Question.belongsTo(Category)

module.exports = {
  Ability,
  Character,
  Category,
  Question,
  User
}
const Sequelize = require('sequelize')
const db = require('../db')

const Ability = db.define('ability', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('healing', 'weaponry', 'strength', 'magic', 'trash'),
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Ability

const Sequelize = require('sequelize')
const db = require('../db')

const Character = db.define('character', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false  
  },
  image: {
      type: Sequelize.STRING,
      allowNull: false
  }
})

module.exports = Character
const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  type: {
    type: Sequelize.ENUM('basicArithmetic', 'advancedArithmetic', 'basicGeometry', 'basicProbability')
  }
})

module.exports = Category

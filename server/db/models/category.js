const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
    type: {
        type: Sequelize.ENUM('linear', 'non-linear', 'data analysis', 'misc')
    }
})

module.exports = Category
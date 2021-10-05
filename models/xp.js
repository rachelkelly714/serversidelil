const {DataTypes} = require('sequelize');
const db = require('../db');

const Xp = db.define('xp', {
  xpLevel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
 

});

module.exports = Xp;
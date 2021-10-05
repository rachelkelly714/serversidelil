const {DataTypes} = require('sequelize');
const db = require('../db');

const Ahiss = db.define('ahiss', {
    armorClass: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  initiative: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  healthPoints: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  speed: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fortitude: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  will: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reflex: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Ahiss;
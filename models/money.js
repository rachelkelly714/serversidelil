const {DataTypes} = require('sequelize');
const db = require('../db');

const Money = db.define('money', {
  cp: {
    type: DataTypes.INTEGER,
   
  },
  sp: {
    type: DataTypes.INTEGER,
  
  },
  gp: {
    type: DataTypes.INTEGER,
   
  },
  platp: {
    type: DataTypes.INTEGER,
  
  }
   

});

module.exports = Money;
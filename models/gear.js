const {DataTypes} = require('sequelize');
const db = require('../db');

const Gear = db.define('gear', {
  acItem: {
    type: DataTypes.STRING,
  
  },
  acItemTwo: {
    type: DataTypes.STRING,
   
  },
  acItemThree: {
    type: DataTypes.STRING,
   
  },
  acItemFour: {
    type: DataTypes.INTEGER,
 
  },
  acItemFive: {
    type: DataTypes.STRING,
 
  },
  shield: {
    type: DataTypes.BOOLEAN,
    
  },
  

});

module.exports = Gear;
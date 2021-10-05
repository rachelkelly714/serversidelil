const {DataTypes} = require('sequelize');
const db = require('../db');

const Equipment = db.define('equipment', {
  item: {
    type: DataTypes.STRING,
  
  },
  itemTwo: {
    type: DataTypes.STRING,
  
  },
  itemThree: {
    type: DataTypes.STRING,
  
  },
  itemFour: {
    type: DataTypes.INTEGER,
   
  },
  itemFive: {
    type: DataTypes.STRING,
  
  },
  itemSix: {
    type: DataTypes.STRING,
    
  },
});


  module.exports = Equipment;
const {DataTypes} = require('sequelize');
const db = require('../db');


const Weapon = db.define('weapon', {
    weaponOne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attackBonus: {
      type: DataTypes.STRING,
      
    },
    criticalRange: {
      type: DataTypes.STRING,
     
    },
    weaponType: {
      type: DataTypes.STRING,
   
    },
    range: {
      type: DataTypes.STRING,
    },
    ammunition: {
      type: DataTypes.STRING,
      
    },
    damage: {
      type: DataTypes.STRING,

    },
    
  
  });
  
  module.exports = Weapon;
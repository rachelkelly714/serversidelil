const {DataTypes} = require('sequelize');
const db = require('../db');

const Charinfo = db.define('charinfo', {
  playerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  characterName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alignment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  race: {
    type: DataTypes.STRING,
    
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    
  },
  age: {
    type: DataTypes.INTEGER,
    
  },
  height: {
    type: DataTypes.STRING,
   
  },
  weight: {
    type: DataTypes.STRING,
    
  },
  physicalDescription: {
    type: DataTypes.STRING,
    allowNull: false
  }
   

});

module.exports = Charinfo;
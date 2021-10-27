const {DataTypes} = require('sequelize');
const db = require('../db');

const Charinfo = db.define('charinfo', {
  characterName: {
    type: DataTypes.STRING,

  },

userId: {
  type: DataTypes.INTEGER,
},
  playerName: {
    type: DataTypes.STRING,
    
   
  },
  alignment: {
    type: DataTypes.STRING,
    
  },
  level: {
    type: DataTypes.INTEGER,
    
  },
  deity: {
    type: DataTypes.STRING,
   
  },
  race: {
    type: DataTypes.STRING,
    
  },
  size: {
    type: DataTypes.STRING,
   
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
   
  }

});

module.exports = Charinfo;
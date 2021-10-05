const {DataTypes} = require('sequelize');
const db = require('../db');

const Spells = db.define('spells', {
  firstLevelSpells: {
    type: DataTypes.STRING,
    
  },
  secondLevelSpells: {
    type: DataTypes.STRING,

  },
  thirdLevelSpells: {
    type: DataTypes.STRING,
   
  },
  fourthLevelSpells: {
    type: DataTypes.STRING,
   
  },
  fifthLevelSpells: {
    type: DataTypes.STRING,
   
  },
  sixthLevelSpells: {
    type: DataTypes.STRING,
    
  },
  seventhLevelSpells: {
    type: DataTypes.STRING,
 
  },
  eigthLevelSpells: {
    type: DataTypes.STRING,
    
  },
  ninthLevelSpells: {
    type: DataTypes.STRING,
    
  },
  

});

module.exports = Spells;
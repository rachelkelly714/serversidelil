const {DataTypes} = require('sequelize');
const db = require('../db');

const SpellsPerDay = db.define('spellsperday', {
  firstLevelSpellsLeft: {
    type: DataTypes.INTEGER,
    
  },
  secondLevelSpellsLeft: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  thirdLevelSpellsLeft: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fourthLevelSpellsLeft: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fifthLevelSpellsLeft: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sixthLevelSpellsLeft: {
    type: DataTypes.STRING,
    
  },
  seventhLevelSpellsLeft: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eigthLevelSpellsLeft: {
    type: DataTypes.STRING,
    
  },
  ninthLevelSpellsLeft: {
    type: DataTypes.INTEGER,
    
  }

});

module.exports = SpellsPerDay;
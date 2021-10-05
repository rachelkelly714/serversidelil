const {DataTypes} = require('sequelize');
const db = require('../db');

const Specs = db.define('specs', {
  strength: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  strengthModifier: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dexterity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dexterityModifier: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  constitution: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  conModifier: {
    type: DataTypes.INTEGER,
    
  },
  intelligence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  intModifier: {
    type: DataTypes.INTEGER,
    
  },
  wisdom: {
    type: DataTypes.INTEGER,
    
  },
  wisModifier: {
    type: DataTypes.INTEGER,
   
  },
  charisma: {
    type: DataTypes.INTEGER,
    
  },
  charModifier: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
   

});

module.exports = Specs;
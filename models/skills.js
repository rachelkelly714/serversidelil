const {DataTypes} = require('sequelize');
const db = require('../db');

const Skills = db.define('skills', {
  acrobatics: {
    type: DataTypes.INTEGER,
    
  },
  appraise: {
    type: DataTypes.INTEGER,
   
  },
  bluff: {
    type: DataTypes.INTEGER,
   
  },
  climb: {
    type: DataTypes.INTEGER,
 
  },
  craft: {
    type: DataTypes.INTEGER,

  },
  craftTwo: {
    type: DataTypes.INTEGER,
    
  },
  diplomacy: {
    type: DataTypes.INTEGER,

  },
  disableDevice: {
    type: DataTypes.INTEGER,
    
  },
  disguise: {
    type: DataTypes.INTEGER,
    
  },
  escapeArtist: {
    type: DataTypes.INTEGER,
   
  },
  fly: {
    type: DataTypes.INTEGER,
    
  },
  handleAnimal: {
    type: DataTypes.INTEGER,
    
  },
  heal: {
    type: DataTypes.INTEGER,
 
  },
  initimidate: {
    type: DataTypes.INTEGER,
   
  },
  knowledgeArcana: {
    type: DataTypes.INTEGER,
    
  },
  knowledgeHistory: {
    type: DataTypes.INTEGER,

  },
  knowledgeLocal: {
    type: DataTypes.INTEGER,
   
  },
  knowledgeReligion: {
    type: DataTypes.INTEGER,
    
  },
  knowledgeOther: {
    type: DataTypes.INTEGER,
   
  },
  linguistics: {
    type: DataTypes.INTEGER,
    
  },
  perception: {
    type: DataTypes.INTEGER,
    
  },
  perform: {
    type: DataTypes.INTEGER,
   
  },
  profession: {
    type: DataTypes.INTEGER,
    
  },
  ride: {
    type: DataTypes.INTEGER,

  },
  senseMotive: {
    type: DataTypes.INTEGER,

  },
  sleightOfHand: {
    type: DataTypes.INTEGER,

  },
  stealth: {
    type: DataTypes.INTEGER,

  },
  spellcraft: {
    type: DataTypes.INTEGER,

  },
  survival: {
    type: DataTypes.INTEGER,

  },
  swim: {
    type: DataTypes.INTEGER,

  },
   useMagicDevice: {
    type: DataTypes.INTEGER,

  },
  languages: {
    type: DataTypes.STRING,

  },

   

});

module.exports = Skills;
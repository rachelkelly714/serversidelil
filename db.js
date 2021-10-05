const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:polygraph@localhost:5432/linkedlegacydb");

module.exports = db;
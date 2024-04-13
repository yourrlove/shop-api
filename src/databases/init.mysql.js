const { development: { host, username, password, database, port, dialect }} = require("../configs/config.mysql");
const Sequelize = require("sequelize");
const mysql = require('mysql2/promise')

const initialize = async () => {
  //create database if it doesn't exist
  const connection = await mysql.createConnection({
    host: host,
    user: username,
    password: password,
    port: port,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);

  //connect to database
  // const sequelize = new Sequelize(DB, USER, PASSWORD, {
  //   host: HOST,
  //   dialect: dialect,
  //   port: PORT,
  // });

  //await db.sequelize.sync({ alter: true });
} 

//connect to database
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port,
});

sequelize.authenticate()
 .then(() => {
    console.log('Connection has been established successfully.');
  })

module.exports = { 
  initialize,
  sequelize,
};
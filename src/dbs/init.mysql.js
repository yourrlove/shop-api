const { mysql_db: { HOST, USER, PASSWORD, DB, PORT, dialect }} = require("../configs/config.mysql");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  port: PORT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected Mysqldb Success');
  })
  .catch(err => {
    console.log(err);
  });

module.exports = sequelize;
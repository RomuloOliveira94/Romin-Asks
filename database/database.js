const Sequelize = require("sequelize");
require("dotenv").config();

//connection with databases
const connection = new Sequelize("asks", "root", process.env.SQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;

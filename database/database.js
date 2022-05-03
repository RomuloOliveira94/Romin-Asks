const Sequelize = require("sequelize");

//connection with databases
const connection = new Sequelize("asks", "root", "M@tador123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;

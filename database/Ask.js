const Sequelize = require("sequelize");
const connection = require("./database");

//create the table, name 'ask', content in the object.
const Ask = connection.define("Asks", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

//creating syncs with databases, forcing if false
Ask.sync({ force: false }).then(() => console.log("table created"));

module.exports = Ask;

const Sequelize = require("sequelize");

const db = new Sequelize('messenger', 'postgres', `${process.env.PASSWORD}`, {
  host: 'localhost',
  dialect: 'postgres',
});

// Test connection
const test = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test();

module.exports = db;
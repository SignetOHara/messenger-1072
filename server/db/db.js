require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(
  `postgres://${process.env.NAME}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DBNAME}`
);

// Test connection
const test = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

test();

module.exports = db;

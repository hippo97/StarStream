const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "starstream",
    password: process.env.DB_PASSWORD,
    database: "starstream-db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "starstream",
    password: process.env.DB_PASSWORD,
    database: "starstream-db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "starstream",
    password: process.env.DB_PASSWORD,
    database: "starstream-db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

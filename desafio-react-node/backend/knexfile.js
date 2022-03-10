const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  migrations: {
    // tableName: "knex_migrations",
    directory: `${__dirname}/src/database/migrations`,
  },
});

module.exports = knex;

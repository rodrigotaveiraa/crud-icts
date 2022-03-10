module.exports = {
  development: {
    client: "mysql2",
    connection: {
      user: "teste",
      password: "senha",
      database: "meubanco",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `./src/database/migrations`,
    },
    pool: { min: 0, max: 7 },
  },
};

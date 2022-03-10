exports.up = function (knex) {
  return knex.schema.createTable("item", function (table) {
    table.int("idItem").unique().notNullable();
    table.string("nome");
    table.string("marca");
    table.string("tipo");
    table.int("quantidade");
    table.double("preco");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("item");
};

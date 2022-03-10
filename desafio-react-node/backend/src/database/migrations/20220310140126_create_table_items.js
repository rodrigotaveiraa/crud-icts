exports.up = function (knex) {
  return knex.schema.createTable("items", function (table) {
    table.integer("idItem").unique().notNullable();
    table.string("nome");
    table.string("marca");
    table.string("tipo");
    table.integer("quantidade");
    table.double("preco");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};

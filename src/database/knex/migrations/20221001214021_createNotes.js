// cria a tabela notes
exports.up = knex => knex.schema.createTable("notes", table => {
  // autoincremento
  table.increments("id");
  // title tipo texto
  table.text("title");
  // description tipo texto
  table.text("description");
  // user_id é uma referencia ao id da tabela users
  table.integer("user_id").references("id").inTable("users");

  // funcao knex para capturar a hora atual
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
});

// deleta a tabela notes
exports.down = knex => knex.schema.dropTable("notes");

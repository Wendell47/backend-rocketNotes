// cria a tabela tags
exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id").primary();
  table.text("name").notNullable();

  // .onDelete("CASCADE") significa que se deletar a nota que essa tag esta vinculada, a tag será deletada
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
});

// deleta a tabela tags
exports.down = knex => knex.schema.dropTable("tags");

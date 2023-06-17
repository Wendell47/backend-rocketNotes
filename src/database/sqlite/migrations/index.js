// conexao com a database criada
const sqliteConnection = require('../../sqlite');
// arquivo automatizado de criacao
const createUsers = require('./createUsers');

// rodar as migrations
async function migrationsRun(){
  // tabelas que o banco vai ter
  // jutamos todas com nenhum separador
  const schemas = [
    createUsers
  ].join('');

  // no database executa os schemas
  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun;

// hash é a função que gera a criptografia
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const UserRepository = require("../repositories/UserRepository");
const sqliteConnection = require("../database/sqlite");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, password });

    // retorna status de criado com sucesso
    return response.status(201).json();
  }

  async update(request, response) {
    // busca name e email no body request
    const { name, email, password, old_password } = request.body;
    // dentro do middleware de autenticação temos o user_id
    const user_id = request.user.id;
    
    // conexao com DB 
    // usa-se await pois por ser uma conexao com  DB, nada acontece na mesma hora
    const database = await sqliteConnection();
    // Busca pelo usuario do ID
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    // verifica se usuario existe e gera um erro
    if (!user) {
      throw new AppError("Usuário não existe");
    }

    // verifica se o usuario esta tentando trocar o email por um email ja exitente
    const userWithUpdatesEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userWithUpdatesEmail && userWithUpdatesEmail.id !== user.id){
      throw new AppError("Este e-mail já está em uso.");
    }

    // Se existir conteudo dentro de nome e email, então utilize esse conteudo, caso não tenha nada, utilize user.name e email.name
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // caso o usuario digitar a nova senha, mas nao a antiga
    if(password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
    }

    // verificar se a senha antiga é a mesma, para isso usamos o compare do bcryptjs
    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere.");
      }

      // atualiza a senha
      user.password = await hash(password, 8);
    }

    // Atualizacao no banco de dados
    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;
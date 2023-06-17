// importar o banco de dados
const knex = require("../database/knex");
// importar o App error para exibir mensagem de erro
const AppError = require("../utils/AppError");
// importar configuracoes token
const authConfig = require("../configs/auth");

// importar funcao sing que vai gerar o token
const { sign } = require("jsonwebtoken");

// para comparar senhas criptografadas
const { compare } = require("bcryptjs");



class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;
    
    // usamos o knex para acessar a tabela users
    // e buscamos o usuario onde o email seja igual o email recebido 
    // usamos o first para garantir que traga somente um usuario
    const user = await knex("users").where({ email }).first();

    // se o usuario nao existe 
    if (!user) {
      throw new AppError("E-mail ou senha incorreta", 401);
    }

    // compara a senha digitada com a cadastrada no banco
    const passwordMatches = await compare(password, user.password);

    // verifica se as senhas sao iguais
    if (!passwordMatches) {
      throw new AppError("E-mail ou senha incorreta", 401);
    }

    // apos validar o cadastro e senha do usuario
    // vamos desestruturar o secret e expiresIn
    const { secret, expiresIn } = authConfig.jwt;
    // criar token usando o sign, importado
    const token = sign({}, secret, {
      // o conteudo que quero inserir no token
      // no caso o ID do usuario
      subject: String(user.id),
      expiresIn
    });
    
    // retornar o usuario recebido
    // agora alem do usuario, retornamos o token
    return response.json({ user, token });
  }
}

module.exports = SessionsController;
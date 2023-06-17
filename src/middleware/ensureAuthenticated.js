const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  // local onde estara o token do usuario
  const authHeader = request.headers.authorization;

  // se o token nao existir
  if(!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

// separar a string em cada espacao em cada posicao do vetor
// eu recebo no authHeader "Bare <token>"
// nao importa o bare, entao pega somente o token
  const [, token] = authHeader.split(" "); 

  // verificar se o token é valido
  try {
    // usa o token mais o jwt secret para verificar se é um token valido
    // pode-se acessa o sub dentro do verify
    // sub é o conteudo que esta armazenado 
    // do sub jah resgata-se o user_id armazenado
    // usamos um alias e a partir de agora o sub sera chamado de user_id 
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    // dentro da requisicao vamos criar uma propriedade que nao existe ainda
    // vamos chamar essa propriedade de user
    // dentro dela teremos o id em numero, pois dentro do token ele era uma string
    request.user = {
      id: Number(user_id)
    }
    
    // se deu tudo certo chamamaos next() que e a proxima acao que sera executada
    return next();
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;
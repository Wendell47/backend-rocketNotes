module.exports = {
  jwt: {
    // segredo do token
    // caso nao encontre a variavel utilizar o default
    secret: process.env.AUTH_SECRET || "default", 
    expiresIn: "1d", // tempo de expiracao
  }
}
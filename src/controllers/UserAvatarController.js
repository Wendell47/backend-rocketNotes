const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    // instanciar DiskStorage
    const diskStorage = new DiskStorage();

    // buscar dados do usuario para atualizar o usuario
    const user = await knex("users").where({ id: user_id }).first();

    if(!user) {
      throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
    }

    // verificar se o usuario possui avatar
    // se existir avatar iremos deletar
    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    // salvar o novo avatar dentro de uploads
    const filename = await diskStorage.saveFile(avatarFilename);
    // agora dentro do user avatar teremos o novo avatar
    user.avatar = filename;

    // atualiza o banco de dados
    await knex("users").update(user).where({ id: user_id });


    // retorna a resposta a requisicao
    return response.json(user);
  } 
}

module.exports = UserAvatarController;
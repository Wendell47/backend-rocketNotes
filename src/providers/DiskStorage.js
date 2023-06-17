// importar fs do proprio node 
// para lidar com manipulacao de arquivo
const fs = require("fs");
// para lidar com os caminhos
const path = require("path");
// configuracao de upload
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    // o rename nao eh mudar o nome do arquivo
    // ele muda o arquivo de lugar
    await fs.promises.rename(
      // vamos pegar o arquivo que esta nessa pasta
      path.resolve(uploadConfig.TMP_FOLDER, file),
      // e muda-lo para essa pasta
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file;
  }

  async deleteFile(file) {
    // vamos capturar o endereco do arquivo
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    // sempre bom utilizar o try catch quando formos trabalhar com manipulacao de arquivo
    // para evitar quebrar a aplicacao
    try {
      // verifica se o arquivo existe
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
// importar o path para ajudar a resolver o caminho
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

// criar nossa pasta temporaria
const TMP_FOLDER = path.resolve(__dirname,"..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

// configurar o multer
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER, // para onde vamos enviar o arquivo
    filename(request, file, callback) {
      // crypto usado para gerar o nome com um hash aleatorio, para evitar ter arquivos de nomes iguais 
      // pois se tiver arquivos de nomes iguais ele iera sobrepor o arquivo
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}
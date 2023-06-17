const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");


const notesRoutes = Router();

const notesController = new NotesController();

// ao inves de aplicar o middleware rota por rota
// passamos o token dessa forma
// agora todas as rotas dependem desse middleware
notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
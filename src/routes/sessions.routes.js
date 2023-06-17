// importa router do express
const { Router } = require("express");

// importa o Sessions Controller
const SessionsController = require("../controllers/SessionsController");

// como eh uma classe iremos instanciar
const sessionsController = new SessionsController();

// instanciamos o router
const sessionsRoutes = Router();
// vamos acessar atravez de post na raiz o create
sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;
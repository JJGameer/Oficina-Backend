const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");
const verificarToken = require("../middlewares/authMiddleware");

router.get("/", verificarToken, servicoController.getServicos);
router.get(
  "/carros/:id",
  verificarToken,
  servicoController.getServicosPorCarro,
);
router.get("/editar/:id", verificarToken, servicoController.getServicosPorId);
router.post("/", verificarToken, servicoController.addServico);
router.put("/editar/:id", verificarToken, servicoController.updateServico);

module.exports = router;

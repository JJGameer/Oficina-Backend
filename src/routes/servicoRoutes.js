const express = require("express");
const upload = require("../middlewares/upload");
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
router.post(
  "/",
  verificarToken,
  upload.array("ficheiros", 5),
  servicoController.addServico,
);
router.put(
  "/editar/:id",
  verificarToken,
  upload.array("ficheiros", 5),
  servicoController.updateServico,
);

module.exports = router;

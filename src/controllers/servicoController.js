const db = require("../config/db");

exports.getServicos = (req, res) => {
  db.query(
    "SELECT * FROM Servico WHERE OficinaId = ? AND (Status != 'Concluído' OR (Status = 'Concluído' AND DataConclusao >= DATE_SUB(NOW(), INTERVAL 1 DAY)))",
    [req.oficinaId],
    (err, results) => {
      if (err) return res.status(500).send("Erro ao carregar serviços");
      res.json(results);
    },
  );
};

exports.getServicosPorCarro = (req, res) => {
  const carroId = req.params.id;
  const sql = "SELECT * FROM Servico WHERE CarroId = ? AND OficinaId = ?";
  db.query(sql, [carroId, req.oficinaId], (err, results) => {
    if (err) return res.status(500).send("Erro ao carregar serviços do carro");
    res.json(results);
  });
};

exports.getServicosPorId = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM Servico WHERE ServicoId = ? AND OficinaId = ?",
    [id, req.oficinaId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      // Enviamos apenas o primeiro objeto do array
      res.json(results[0]);
    },
  );
};

exports.addServico = (req, res) => {
  const {
    DataServico,
    Observacao,
    Status,
    Artigos,
    TipoServico,
    Kilometros,
    CarroId,
    PrecoFinal,
  } = req.body;

  const OficinaId = req.oficinaId;

  const checkSql =
    "SELECT * FROM Servico WHERE CarroId = ? AND Status !='Concluído'";

  db.query(checkSql, [CarroId], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao verificar estado do veiculo");
    }

    if (results.length > 0) {
      return res.status(400).json({
        erro: "Este veículo já tem um serviço em curso. Conclua-o primeiro!",
      });
    }

    const sql =
      "INSERT INTO Servico (OficinaId, CarroId, DataServico, Observacao, Status, Artigos, TipoServico, Kilometros, PrecoFinal) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        OficinaId,
        CarroId,
        DataServico,
        Observacao,
        Status,
        Artigos,
        TipoServico,
        Kilometros,
        PrecoFinal,
      ],
      (err, results) => {
        if (err) return res.status(500).send("Erro ao adicionar serviço");
        res.status(201).json({ id: results.insertId, ...req.body });
      },
    );
  });
};

exports.updateServico = (req, res) => {
  const id = req.params.id;
  const {
    DataServico,
    Observacao,
    Status,
    Artigos,
    TipoServico,
    Kilometros,
    PrecoFinal,
  } = req.body;

  const OficinaId = req.oficinaId;

  const sql = `
    UPDATE Servico 
    SET DataServico = ?, Observacao = ?, Status = ?, Artigos = ?, TipoServico = ?, Kilometros = ?, PrecoFinal = ?, DataConclusao = CASE WHEN ? = 'Concluído' THEN NOW() ELSE NULL END
    WHERE ServicoId = ? AND OficinaId = ?
  `;

  db.query(
    sql,
    [
      DataServico,
      Observacao,
      Status,
      Artigos,
      TipoServico,
      Kilometros,
      PrecoFinal,
      Status,
      id,
      OficinaId,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erro ao atualizar serviço");
      }
      res.json({ message: "Serviço Atualizado" });
    },
  );
};

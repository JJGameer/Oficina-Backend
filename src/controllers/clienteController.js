const db = require("../config/db");

exports.getClientes = (req, res) => {
  db.query(
    "SELECT * FROM Cliente WHERE OficinaId = ?",
    [req.oficinaId],
    (err, results) => {
      if (err) return res.status(500).send("Erro ao carregar os clientes");
      res.json(results);
    },
  );
};

exports.addCliente = (req, res) => {
  const { Nome, Contacto, Morada } = req.body;
  const OficinaId = req.oficinaId;

  db.query(
    "INSERT INTO Cliente (OficinaId, Nome, Contacto, Morada) VALUES (?, ?, ?, ?)",
    [OficinaId, Nome, Contacto, Morada],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erro a adicionar cliente", err);
      }
      res
        .status(201)
        .json({ id: results.insertId, OficinaId, Nome, Contacto, Morada });
    },
  );
};

exports.updateCliente = (req, res) => {
  const id = req.params.id;
  const { Nome, Contacto, Morada } = req.body;
  const OficinaId = req.oficinaId;

  const sql = `
    UPDATE Cliente 
    SET Nome = ?, Contacto = ?, Morada = ?
    WHERE ClienteId = ? AND OficinaId = ?
  `;

  db.query(sql, [Nome, Contacto, Morada, id, OficinaId], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao atualizar cliente");
    }
    res.json({ message: "Cliente Atualizado" });
  });
};

require("dotenv").config({ path: "./.env" }); // Isto obriga-o a ler o ficheiro na raiz
const express = require("express");
const cors = require("cors");

//Importação das rotas
const carroRoutes = require("./routes/carroRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Middlewares
app.use(express.json()); //para identificar formato json
app.use(
  cors({
    origin: "https://oficina-frontend-ten.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//Prefixes
app.use("/auth", authRoutes);
app.use("/carros", carroRoutes);
app.use("/clientes", clienteRoutes);
app.use("/servicos", servicoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT} check`);
});

const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const app = express();

require("dotenv/config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando porta: ${process.env.PORT}`);
});

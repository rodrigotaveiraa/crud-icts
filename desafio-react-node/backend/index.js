const express = require('express')
const cors = require('cors')
const app = express()

require("dotenv/config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', (req, res) => {
    res.send("Hello world")
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando porta: ${process.env.PORT}`);
  });
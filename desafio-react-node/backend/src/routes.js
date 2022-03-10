const express = require("express");
const routes = express.Router();

const itemController = require("./controllers/itemController");

routes.post("/items", itemController.createItem);
routes.get("/items/", itemController.listItems);
routes.get("/items/:id", itemController.listOne);
routes.put("/items/:id", itemController.updateItem);
routes.delete("/items/:id", itemController.deleteItem);

module.exports = routes;

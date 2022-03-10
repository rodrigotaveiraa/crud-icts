const connection = require("../database/index");

module.exports = {
  async createItem(req, res) {
    try {
      let resp = await connection("items").insert(req.body);
      return res.status(200).send(resp);
    } catch (e) {
      console.log(e);
    }
  },

  async listItems(req, res) {
    try {
      let items = await connection("items").select("*");
      return res.status(200).json(items);
    } catch (e) {
      console.log(e);
    }
  },

  async listOne(req, res) {
    let { id } = req.params;

    try {
      let items = await connection("items")
        .select("*")
        .where("idItem", id)
        .first();
      return res.status(200).json(items);
    } catch (e) {
      console.log(e);
    }
  },

  async updateItem(req, res) {
    let { id } = req.params;

    try {
      let updated = await connection("items")
        .where("idItem", id)
        .update(req.body);

      if (updated) {
        return res.status(200).json(updated);
      }
    } catch (e) {
      console.log(e);
    }
  },

  async deleteItem(req, res) {
    let { id } = req.params;

    try {
      let deleted = await connection("items").where("idItem", id).delete();
      if (deleted) {
        return res.status(200).json(deleted);
      }
    } catch (e) {
      console.log(e);
    }
  },
};

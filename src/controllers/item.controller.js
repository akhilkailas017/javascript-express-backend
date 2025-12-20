const itemService = require("../services/item.service");

async function createItem(req, res) {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res
        .status(400)
        .json({ error: "All fields are required: name, description, price" });
    }
    const item = await itemService.createItem(
      name,
      description,
      price,
      req.user.id,
    );
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getItem(req, res) {
  try {
    const items = await itemService.getItem(req.query, req.user.id);
    return res.status(200).json({ data: items });
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.message || "Failed to fetch users",
    });
  }
}

module.exports = {
  createItem,
  getItem,
};

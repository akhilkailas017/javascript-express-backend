const itemRepository = require("../repositories/item.repository");

async function createItem(name, description, price, id) {
  const user = await itemRepository.createItem({
    name,
    description,
    price,
    createdBy: id,
  });
  return user;
}

async function getItem(filters, userId) {
  return itemRepository.getItemsByCreator(userId, filters);
}

module.exports = {
  createItem,
  getItem,
};

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

module.exports = {
  createItem,
};

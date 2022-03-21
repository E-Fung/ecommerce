async function updateOrCreate(model, newItem) {
  const filter = { productId: newItem.productId, userId: newItem.userId };
  const foundItem = await model.findOne({ where: filter });
  if (!foundItem) {
    return model.create(newItem);
  }
  await foundItem.update({ quantity: foundItem.quantity + newItem.quantity });
}

module.exports = { updateOrCreate };

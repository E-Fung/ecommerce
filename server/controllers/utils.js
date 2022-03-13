async function updateOrCreate(model, where, newItem) {
  // First try to find the record
  const foundItem = await model.findOne({ where });
  console.log(foundItem);
  console.log(newItem, where);
  if (!foundItem) {
    // Item not found, create a new one
    console.log('creating');
    return model
      .create(newItem)
      .then((product) => console.log(product))
      .catch((error) => console.log(error));
    return { item, created: true };
  }
  // Found an item, update it
  console.log('updating');

  const item = await model.update(newItem, { where });
  return { item, created: false };
}

module.exports = { updateOrCreate };

function applyExtraSetup(sequelize) {
  const { User, Order, Product } = sequelize.models;

  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  Order.belongsToMany(Product, { through: 'OrderedProduct', foreignKey: 'orderId' });
  Product.belongsToMany(Order, { through: 'OrderedProduct', foreignKey: 'productId' });

  User.belongsToMany(Product, { through: 'ProductInCart', foreignKey: 'userId' });
  Product.belongsToMany(User, { through: 'ProductInCart', foreignKey: 'productId' });
}

module.exports = { applyExtraSetup };

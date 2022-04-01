function applyExtraSetup(sequelize) {
  const { User, Order, Product, ProductInCart } = sequelize.models;

  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  // Order.belongsToMany(Product, { through: 'OrderedProduct', foreignKey: 'orderId' });
  // Product.belongsToMany(Order, { through: 'OrderedProduct', foreignKey: 'productId' });

  Product.hasMany(ProductInCart, { foreignKey: 'productId' });
  ProductInCart.belongsTo(Product, { foreignKey: 'productId' });

  User.hasMany(ProductInCart, { foreignKey: 'userId' });
  ProductInCart.belongsTo(User, { foreignKey: 'userId' });

  // User.belongsToMany(Product, { through: 'ProductInCart', foreignKey: 'userId' });
  // Product.belongsToMany(User, { through: 'ProductInCart', foreignKey: 'productId' });
}

module.exports = { applyExtraSetup };

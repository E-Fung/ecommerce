function applyExtraSetup(sequelize) {
  const { User, Order, Product, ProductInCart, OrderedProduct } = sequelize.models;

  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  Order.hasMany(OrderedProduct, { foreignKey: 'orderId' });
  OrderedProduct.belongsTo(Order, { foreignKey: 'orderId' });

  OrderedProduct.belongsTo(Product, { foreignKey: 'productId' });
  Product.hasOne(OrderedProduct, { foreignKey: 'productId' });

  Product.hasMany(ProductInCart, { foreignKey: 'productId' });
  ProductInCart.belongsTo(Product, { foreignKey: 'productId' });

  User.hasMany(ProductInCart, { foreignKey: 'userId' });
  ProductInCart.belongsTo(User, { foreignKey: 'userId' });
}

module.exports = { applyExtraSetup };

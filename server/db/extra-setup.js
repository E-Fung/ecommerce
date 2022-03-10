function applyExtraSetup(sequelize) {
  const { User, Order, Product, ProductInCart, OrderedProducts } = sequelize.models;

  User.hasMany(Order);
  Order.belongsTo(User);

  Order.belongsToMany(Product, { through: 'OrderedProduct', foreignKey: 'OrderId' });
  Product.belongsToMany(Order, { through: 'OrderedProduct', foreignKey: 'ProductId' });

  User.belongsToMany(Product, { through: 'ProductInCart', foreignKey: 'UserId' });
  Product.belongsToMany(User, { through: 'ProductInCart', foreignKey: 'ProductId' });
}

module.exports = { applyExtraSetup };

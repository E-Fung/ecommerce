//each order should have a unique id, should have time bought, user id, total cost??

//has many products, connected by table
//quantity bought, item id, order id

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {}
  Order.init(
    {},
    {
      sequelize, //connection instance
      modelName: 'Order',
      freezeTableName: true,
      timestamps: true,
      updatedAt: false,
    }
  );
  return Order;
};

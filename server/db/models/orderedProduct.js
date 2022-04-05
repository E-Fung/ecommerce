'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderedProduct extends Model {}
  OrderedProduct.init(
    {
      orderedProductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize, //connection instance
      modelName: 'OrderedProduct',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return OrderedProduct;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderedProduct extends Model {}
  OrderedProduct.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
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
